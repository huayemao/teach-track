import {
  DEFAULT_SCHOOL_METRIC_CONFIG,
  DEFAULT_SCHOOL_METRIC_CONFIG_BY_REGION,
  DEFAULT_TEACHER_METRIC_CONFIG,
  DEFAULT_TEACHER_METRIC_CONFIG_BY_REGION,
  FILED_MAPPING_BY_GRADE,
  SCHOOLS,
  SCORE_THRESHOLD_BY_GRADE,
} from "@/constants/index";
import flatMap from "lodash/flatMap";
import groupBy from "lodash/groupBy";
import map from "lodash/map";
import pick from "lodash/pick";
import XLSX from "xlsx";

type ExamResult = {
  县级考号: string;
  县考姓名: string;
  学校: string;
  校区?: string;
  班级: string;
  语文: string;
  数学: string;
  英语: string;
  道德与法治: string;
  历史: string;
  地理: string;
  生物: string;
  音乐: string;
  美术: string;
  总分: string;
  折算总分: string;
  年级: string;
  州考考号: string;
  州考姓名: string;
  英语原: string;
  "总分（含加分）"?: string;
  折合总分?: string;
};

export type TeacherInfo = {
  学校: string;
  校区?: string;
  年级: string;
  班级: string;
  教师: string;
  应考数: string;
  实考数: string;
  总分: string;
  平均分: string;
  合格数: string;
  合格率: string;
  优生数: string;
  优生率: string;
  教科研加分: string;
  综合成绩: string;
  classes?: string[];
};

export type SchoolInfo = {
  学校: string;
  应考数: number;
  实考数: number;
  年级总分: number;
  年级总平均分: number;
  合格数: number;
  合格率: number;
  优生数: number;
  优生率: number;
  全科合格数: number;
  全科合格率: number;
  巩固率?: number;
  巩固率计算得分?: number;
  巩固率实际得分?: number;
  综合成绩: number;
  名次: number;
  "年级总分（含加分）"?: number;
};

const parseClasses = (str: string) => {
  const arr = str.split("/");
  const getValue = (str: string) => {
    if (str.includes("-")) {
      const [start, end] = str.split("-");
      return Array.from(
        {
          length: Number(end) - Number(start) + 1,
        },
        (_, i) => {
          return String(Number(start) + i);
        }
      );
    } else {
      return [str];
    }
  };
  return flatMap(arr, getValue);
};

const getMetricWeightConfigByTeacher = (
  teacher: TeacherInfo,
  config: typeof DEFAULT_TEACHER_METRIC_CONFIG_BY_REGION
) => {
  const schoolName = teacher["学校"];

  type ByRegionConfig = typeof DEFAULT_TEACHER_METRIC_CONFIG_BY_REGION;

  if (!("regionName" in config["0"])) {
    throw Error("参数错误：指标权重配置错误");
  }
  const region = SCHOOLS.find((s) => s.学校名称 === schoolName)?.区域类别;
  if (!region) {
    throw Error("学学校域配置解析出错");
  }

  return (config as ByRegionConfig).find(
    (e) => e.regionName === region
  ) as ByRegionConfig["0"];
};

const getMetricWeightConfigBySchool = (
  schoolName: string,
  config: typeof DEFAULT_SCHOOL_METRIC_CONFIG_BY_REGION
) => {
  type ByRegionConfig = (typeof DEFAULT_SCHOOL_METRIC_CONFIG_BY_REGION)[0];
  const region = SCHOOLS.find((s) => s.学校名称 === schoolName)?.区域类别;
  if (!region) {
    throw Error("学学校域配置表解析出错");
  }

  return config.find((e) => e.regionName === region) as ByRegionConfig;
};

function updateTeacher(
  teacher: TeacherInfo,
  property: keyof TeacherInfo,
  value: number
): void {
  /* @ts-ignore */
  if (teacher[property] !== undefined) {
    /* @ts-ignore */
    teacher[property] += value;
  } else {
    /* @ts-ignore */
    teacher[property] = value;
  }
}

type WrongData = {
  reason: string;
  name: string;
};

type PreProcessCallBackRes = {
  invalidCols?: WrongData[];
  invalidSheets?: WrongData[];
};

type CB = (workbook: XLSX.WorkBook) => PreProcessCallBackRes;

const generalPreprocess = (workbook: XLSX.WorkBook, sheetNames: string[]) => {
  const invalidSheets: WrongData[] = [];
  const invalidCols: WrongData[] = [];

  const regex = /\s/g;

  for (const name of sheetNames) {
    // todo: 多余呢？
    if (!workbook.SheetNames.includes(name)) {
      invalidSheets.push({
        name,
        reason: "缺失",
      });
      continue;
    }

    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[name]);

    if (!sheetData[0]) {
      throw Error("未检测到表结构");
    }

    const cols = Object.keys(sheetData[0]);

    const invalidColumnsWithBlank = cols.filter(
      (str) => str.match(regex)?.length
    );

    if (invalidColumnsWithBlank) {
      invalidCols.push(
        ...invalidColumnsWithBlank.map((e) => ({
          name: e,
          reason: "字符串中有空格、换行符等",
        }))
      );
    }
  }

  return {
    invalidSheets,
    invalidCols,
  };
};

// todo: 传一个 callback，来验证，验证不过就不处理数据，
export function preprocess(file: File, sheetNames: string[], cb?: CB) {
  return new Promise<XLSX.WorkBook>((resolve, reject) => {
    if (["xls", "xlsx"].every((suffix) => !file.name.endsWith(suffix))) {
      reject("仅支持导入 excel 文件");
    }

    const reader = new FileReader();

    reader.onload = function (e) {
      if (!e.target) {
        return;
      }
      const data = e.target.result;
      const workbook = XLSX.read(data);

      if (!workbook.SheetNames.length) {
        reject("Excel 工作簿为空！");
      }

      try {
        const { invalidSheets, invalidCols } = generalPreprocess(
          workbook,
          sheetNames
        );

        let errorMsg = "";

        if (invalidSheets.length) {
          errorMsg +=
            "不合法的工作表：\n" +
            invalidSheets.map((e) => `【${e.name}】：${e.reason}`).join(";\n") +
            "\n";
        }

        if (invalidCols?.length) {
          errorMsg +=
            "不合法的列：\n" +
            invalidCols.map((e) => `【${e.name}】：${e.reason}`).join(";\n") +
            "\n";
        }

        if (errorMsg.length) {
          reject(errorMsg);
        } else {
          resolve(workbook);
        }
      } catch (error) {
        reject(error);
      }
      // todo: 校验不该有的地方是否有数据
      // todo: 校验是否有教科研加分！全部都没有时就要提醒

      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsArrayBuffer(file);
  });
}

export type SchoolIncrement = {
  学校: string;
  入口总分: number;
  "入口 Z 分": Number;
  出口总分: number;
  "出口 Z 分": number;
  教学质量增量: number;
};

export function runPredict(file: File, grade: number) {
  return new Promise<SchoolIncrement[]>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (!e.target) {
        return;
      }
      const workbook = XLSX.read(e.target.result);

      const preDictScoreData = XLSX.utils.sheet_to_json(
        Object.values(workbook.Sheets)[0]
      );

      resolve(preDictScoreData);
      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsArrayBuffer(file);
  });
}

export function runIncrement(file: File, grade: number, schools: SchoolInfo[]) {
  return new Promise<{
    学校: string;
    入口总分: number;
    "入口 Z 分": Number;
    出口总分: number;
    "出口 Z 分": number;
    教学质量增量: number;
  }>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      if (!e.target) {
        return;
      }
      const workbook = XLSX.read(e.target.result);

      const studentsInput = XLSX.utils.sheet_to_json(
        Object.values(workbook.Sheets)[0]
      ) as ExamResult[];

      const studentsInputBySchool = groupBy(studentsInput, "学校");

      // 入口成绩不需要应考人数

      const inputSchools: {
        totalScore: number;
        name: string;
        attendCount: number;
      }[] = map(studentsInputBySchool, (v, key) => {
        const scores = v.map((e) => Number(e.折合总分 || 0));
        return {
          totalScore: scores.reduce((acc, val) => acc + val, 0),
          name: key,
          attendCount: scores.filter((e) => e > 0).length,
        };
      });

      const a =
        inputSchools
          .map((e) => e.totalScore)
          .reduce((acc, val) => acc + val, 0) /
        studentsInput.filter((e) => e.折合总分 > 0).length;

      const s = calculateStandardDeviation(
        inputSchools.map((e) => e.totalScore / e.attendCount),
        a
      );

      const averageScore =
        schools
          .map((e) => e["年级总分（含加分）"] as number)
          .reduce((acc, val) => acc + val, 0) /
        schools.map((e) => e.应考数).reduce((acc, val) => acc + val, 0);

      const standardDeviation = calculateStandardDeviation(
        schools.map((e) => (e["年级总分（含加分）"] as number) / e["应考数"]),
        averageScore
      );

      const data = [];

      for (const school of schools) {
        const outPutZScore =
          ((school["年级总分（含加分）"] as number) / school["应考数"] -
            averageScore) /
          standardDeviation;

        const inputSchool = inputSchools.find((e) => e.name === school.学校);

        if (!inputSchool) {
          throw Error("入口学校错误");
        }
        const inputZScore =
          (inputSchool.totalScore / inputSchool.attendCount - a) / s;

        data.push({
          学校: school.学校,
          入口总分: inputSchool.totalScore,
          "入口 Z 分": inputZScore,
          出口总分: school["年级总分（含加分）"],
          "出口 Z 分": outPutZScore,
          教学质量增量: outPutZScore - inputZScore,
        });
      }

      resolve(data);
      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsArrayBuffer(file);
  });
}

function calculateStandardDeviation(data: number[], mean: number): number {
  const n = data.length;
  if (n === 0) {
    throw new Error("Data array cannot be empty");
  }

  const squaredDifferences = data.map((value) => Math.pow(value - mean, 2));
  const sumOfSquaredDifferences = squaredDifferences.reduce(
    (sum, value) => sum + value,
    0
  );
  const variance = sumOfSquaredDifferences / n;
  const standardDeviation = Math.sqrt(variance);

  return standardDeviation;
}

// todo: 复用 preProcess
export async function run(
  file: File,
  grade: number
): Promise<{ teachers: TeacherInfo[]; schools: SchoolInfo[] }> {
  let workbook: XLSX.WorkBook;
  try {
    workbook = await preprocess(file, ["学生成绩", "教师", "学校"]);
  } catch (error) {
    throw "Excel 数据校验错误：\n" + error;
  }

  const [studentsFromExcel, teachersFromExcel, schoolsFromExcel] = [
    "学生成绩",
    "教师",
    "学校",
  ].map((e) => {
    return XLSX.utils.sheet_to_json(workbook.Sheets[e]);
  });

  (teachersFromExcel as TeacherInfo[]).forEach((t) => {
    t = {
      ...t,
      classes: parseClasses((t["班级"] as string).replace("班", "")).map(
        (c, i, arr) => t["学校"] + c + "班"
      ),
    };
  });

  try {
    const teachers = await runTeachers(
      teachersFromExcel as TeacherInfo[],
      studentsFromExcel as ExamResult[],
      grade,
      {
        getMetricWeightConfig:
          grade < 7
            ? () => DEFAULT_TEACHER_METRIC_CONFIG[0]
            : (teacher) =>
                getMetricWeightConfigByTeacher(
                  teacher,
                  DEFAULT_TEACHER_METRIC_CONFIG_BY_REGION
                ),
      }
    );

    const schools = await runSchools(
      schoolsFromExcel as SchoolInfo[],
      studentsFromExcel as ExamResult[],
      {
        totalScoreThresholdConfig: SCORE_THRESHOLD_BY_GRADE[grade].total,
        fieldMapping: FILED_MAPPING_BY_GRADE[grade],
        getMetricWeightConfig:
          grade < 7
            ? () => DEFAULT_SCHOOL_METRIC_CONFIG[0]
            : (school) => {
                return getMetricWeightConfigBySchool(
                  school.学校,
                  DEFAULT_SCHOOL_METRIC_CONFIG_BY_REGION
                );
              },
      }
    );

    return {
      schools,
      teachers,
    };
  } catch (error) {
    throw "运算错误：" + error;
  }
}

const THRESHOLD_CONFIG = Object.values(SCORE_THRESHOLD_BY_GRADE)[0].total;
const FILED_MAPPING = Object.values(FILED_MAPPING_BY_GRADE)[0];

type RunSchoolOptions = {
  totalScoreThresholdConfig: typeof THRESHOLD_CONFIG;
  fieldMapping: typeof FILED_MAPPING;
  getMetricWeightConfig: (
    school: SchoolInfo
  ) => (typeof DEFAULT_TEACHER_METRIC_CONFIG)[0];
  // todo: 指标权重迟早要加的。它是个函数，或是个 item?
};

function runSchools(
  schools: SchoolInfo[],
  students: ExamResult[],
  options: RunSchoolOptions
) {
  const schoolCount = SCHOOLS.length;
  const studentsBySchool = groupBy(students, "学校");
  // if (schoolCount != Object.keys(studentsBySchool).length) {
  //   alert("学校数量与系统中配置的不一致，已配置的学校：\n");
  // }

  const schoolNames = SCHOOLS.map((e) => e.学校名称);
  const schoolNamesFromExamResult = Object.keys(studentsBySchool);

  const { totalScoreThresholdConfig, fieldMapping, getMetricWeightConfig } =
    options;

  // if (
  //   JSON.stringify(schoolNames.sort()) !=
  //   JSON.stringify(schoolNamesFromExamResult.sort())
  // ) {
  //   alert("学校与系统中配置的不一致");
  // }

  for (const [schoolName, students] of Object.entries(studentsBySchool)) {
    const school = schools.find((e) => e.学校 === schoolName);
    if (!school) {
      throw Error("学生成绩中的学校未在学校列表找到" + schoolName);
    }
    const totalScoreField = fieldMapping.totalScore;
    const totalScores = students.map((e) => Number(e[totalScoreField]));
    const attendCount = totalScores.filter((e) => !!e).length;

    // todo: 校验参数是否配置

    const qualifiedCount = totalScores.filter(
      (e) => e > totalScoreThresholdConfig.qualifiedThreshold
    ).length;
    const excellentCount = totalScores.filter(
      (e) => e > totalScoreThresholdConfig.excellentThreshold
    ).length;

    const schoolTotalScore = totalScores.reduce((acc, item) => {
      return item + acc;
    }, 0);

    const averageScore = schoolTotalScore / school.应考数;

    // todo: 全科合格率
    // const subjects = [
    //   "语文",
    //   "数学",
    //   "英语",
    //   "道德与法治",
    //   "历史",
    //   "地理",
    //   "生物",
    // ];
    // const fullyQualifiedCount = students.filter((s) => {
    //   return subjects.every((subject) => {
    //     const studentScore = Number(s[subject as keyof ExamResult]);
    //     const qualifiedScore =
    //       SUBJECT_SCORE_METRICS[subject as keyof typeof SUBJECT_SCORE_METRICS]
    //         .qualifiedThreshold;
    //     return studentScore >= qualifiedScore;
    //   });
    // }).length;

    school.年级总分 = schoolTotalScore;

    // todo: 这个是特殊逻辑，只对九年级有意义，目的是为了算 z 分？但是会对别的年级的数据展示造成影响。。。

    school["年级总分（含加分）"] = students
      .map((e) => Number(e["总分（含加分）"]))
      .reduce((arr, score) => arr + score, 0);
    school.年级总平均分 = averageScore;
    school.实考数 = attendCount;
    // school.全科合格数 = fullyQualifiedCount;

    school.合格数 = qualifiedCount;
    school.合格率 = qualifiedCount / school.应考数;
    school.优生数 = excellentCount;
    school.优生率 = excellentCount / school.应考数;

    // todo: 巩固率的抽出来，最后算
    school.巩固率 = attendCount / school.应考数;
    school.巩固率计算得分 = 20 - (100 - school.巩固率 * 100) * 2;
    school.巩固率实际得分 = 20 - (100 - school.巩固率 * 100) * 2;

    // todo: 学校综合成绩也分区域的

    const metricWeightConfig = getMetricWeightConfig(school);

    school.综合成绩 =
      school.年级总平均分 * metricWeightConfig.averageScore +
      school.合格率 * 100 * metricWeightConfig.qualifiedRate +
      school.优生率 * 100 * metricWeightConfig.excellentRate +
      school.巩固率实际得分;
  }

  return schools;
}

// todo: 先清空数据
function runTeachers(
  teacherInfos: TeacherInfo[],
  students: ExamResult[],
  grade: number,
  options: {
    getMetricWeightConfig: (
      teacher: TeacherInfo
    ) => (typeof DEFAULT_TEACHER_METRIC_CONFIG)[0];
  }
) {
  const { getMetricWeightConfig } = options;
  const thresholdsBySubject = SCORE_THRESHOLD_BY_GRADE[grade];

  // todo: 这个还要加上校区才能区分

  const teachers = teacherInfos.map((e) => {
    return {
      ...e,
      classes: parseClasses((e["班级"] as string).replace("班", "")).map(
        (c, i, arr) => e["学校"] + e["校区"] + c + "班"
      ),
    };
  });

  const studentsByClass = groupBy(
    students,
    (e) => e["学校"] + e["校区"] + e["班级"]
  );

  for (const [key, students] of Object.entries(studentsByClass)) {
    const targetTeachers = teachers.filter((t) => {
      if (!t.classes?.length) {
        throw Error("教师班级字符串解析错误：" + t.班级);
      }
      return t.classes.includes(key);
    });
    if (!targetTeachers.length) {
      console.log(
        teachers.filter((e) =>
          e.classes.some((s) => s.includes("老城阿郎完小"))
        )
      );
      // todo: 这里要核实
      alert("在教师表中未找到学生班级: " + key);
      // throw Error("在教师表中未找到学生班级: " + key);
    }

    for (const teacher of targetTeachers) {
      const subject = teacher["年级"].replace(/.年级/, "");

      if (!(subject in students[0])) {
        throw Error("教师学科错误：和考试成绩学科字段不对应：" + subject);
      }

      const scores = students.map((item) =>
        Number(item[subject as keyof ExamResult])
      );

      const qualifiedCount = scores.filter((e) => {
        if (!(subject in thresholdsBySubject)) {
          throw Error("找不到科目的指标配置：" + subject);
        }
        return e >= thresholdsBySubject[subject].qualifiedThreshold;
      }).length;

      const excellentCount = scores.filter((e) => {
        return e >= thresholdsBySubject[subject].excellentThreshold;
      }).length;

      const subjectScore = scores.reduce((arr, score) => arr + score, 0);
      const attendCount = scores.filter((s) => !!s).length;
      const qualifiedRate = qualifiedCount / Number(teacher["应考数"]);
      const excellentRate = excellentCount / Number(teacher["应考数"]);
      const averageScore = subjectScore / Number(teacher["应考数"]);

      const originalTeacherObj = teachers.find(
        (e) =>
          JSON.stringify(pick(e, ["年级", "教师"])) ===
          JSON.stringify(pick(teacher, ["年级", "教师"]))
      );

      if (originalTeacherObj) {
        updateTeacher(teacher, "总分", subjectScore);
        updateTeacher(teacher, "合格数", qualifiedCount);
        updateTeacher(teacher, "实考数", attendCount);
        updateTeacher(teacher, "优生数", excellentCount);
        updateTeacher(teacher, "平均分", averageScore);
        updateTeacher(teacher, "合格率", qualifiedRate);
        updateTeacher(teacher, "优生率", excellentRate);
      }
    }
  }

  for (const teacher of teachers) {
    // todo: 这里要传个大对象，byRegion、config
    const config = getMetricWeightConfig(teacher);

    const { 平均分, 合格率, 优生率, 教科研加分 } = teacher;
    const grade =
      Number(平均分) * config.averageScore +
      Number(合格率) * config.qualifiedRate * 100 +
      Number(优生率) * config.excellentRate * 100 +
      Number(教科研加分 || 0);

    const originalTeacherObj = teachers.find(
      (e) =>
        JSON.stringify(pick(e, ["年级", "教师"])) ===
        JSON.stringify(pick(teacher, ["年级", "教师"]))
    );

    if (originalTeacherObj) {
      updateTeacher(teacher, "综合成绩", grade);
    }
  }
  return teachers;
}
