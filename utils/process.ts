import {
  DEFAULT_SCHOOL_METRIC_CONFIG_BY_REGION,
  DEFAULT_TEACHER_METRIC_CONFIG_BY_REGION,
  KEY_MAPPING,
  SCHOOLS,
  SUBJECT_SCORE_METRICS,
  TOTAL_SCORE_METRICS,
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
  校区: string;
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
  巩固率: number;
  巩固率计算得分: number;
  巩固率实际得分: number;
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

const getConfigByTeacher = (teacher: TeacherInfo) => {
  const schoolName = teacher["学校"];
  const region = SCHOOLS.find((s) => s.学校名称 === schoolName)?.区域类别;
  if (!region) {
    throw Error("学校区域配置解析出错");
  }
  return DEFAULT_TEACHER_METRIC_CONFIG_BY_REGION.find(
    (e) => e.regionName === region
  ) as (typeof DEFAULT_TEACHER_METRIC_CONFIG_BY_REGION)["0"];
};

const getMetricWeightConfigBySchool = (schoolName: string) => {
  const region = SCHOOLS.find((s) => s.学校名称 === schoolName)?.区域类别;
  if (!region) {
    throw Error("学校区域配置表解析出错");
  }
  return DEFAULT_SCHOOL_METRIC_CONFIG_BY_REGION.find(
    (e) => e.name === region
  ) as {
    name: string;
    averageScore: number;
    qualifiedRate: number;
    excellentRate: number;
  };
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

export function preprocess(file: File, grade: number) {
  return new Promise<{
    teachers: (TeacherInfo & { classes: string[] })[];
    students: ExamResult[];
    columns: Record<string, string[]>;
  }>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      if (!e.target) {
        return;
      }
      const data = e.target.result;
      const workbook = XLSX.read(data);

      const students = XLSX.utils.sheet_to_json(
        workbook.Sheets["学生成绩"]
      ) as ExamResult[];

      const teacherInfos: TeacherInfo[] = XLSX.utils.sheet_to_json(
        workbook.Sheets["教师"]
      );
      const teachers = teacherInfos.map((e) => {
        return {
          ...e,
          classes: parseClasses((e["班级"] as string).replace("班", "")).map(
            (c, i, arr) => e["学校"] + c + "班"
          ),
        };
      });

      // todo: 校验工作表
      // todo: 校验列名
      // todo: 表头不应允许有空格！

      const columns = {
        students: Object.keys(students[0]),
        teachers: Object.keys(teacherInfos[0]),
      };

      const regex = /\s/g;
      const invalidStudentColumns = columns.students.filter(
        (str) => str.match(regex)?.length
      );
      const invalidTeacherColumns = columns.teachers.filter(
        (str) => str.match(regex)?.length
      );

      if (invalidStudentColumns.length) {
        throw Error(
          "不合法的学生列：" +
            invalidStudentColumns.map((e) => `【${e}】`).join("、")
        );
      }

      if (invalidTeacherColumns.length) {
        throw Error(
          "不合法的教师列：" +
            invalidTeacherColumns.map((e) => `【${e}】`).join("、")
        );
      }

      // todo: 校验不该有的地方是否有数据
      // todo: 校验是否有教科研加分！全部都没有时就要提醒

      resolve({
        teachers,
        students,
        columns,
      });

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

        const inputSchool = inputSchools.find((e) => e.name === school.校区);

        if (!inputSchool) {
          throw Error("入口学校错误");
        }
        const inputZScore =
          (inputSchool.totalScore / inputSchool.attendCount - a) / s;

        data.push({
          学校: school.校区,
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

export function run(
  file: File,
  grade: number
): Promise<{ teachers: TeacherInfo[]; schools: SchoolInfo[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async function (e) {
      if (!e.target) {
        return;
      }
      const data = e.target.result;
      const workbook = XLSX.read(data);

      // todo: 各班成绩

      const schoolInfos: SchoolInfo[] = XLSX.utils.sheet_to_json(
        workbook.Sheets["学校"]
      );

      try {
        const { teachers, students } = await preprocess(file, grade);
        const teachersResult = runTeachers(teachers, students, grade);
        const schoolResult = runSchools(schoolInfos, students, grade);

        return resolve({ teachers: teachersResult, schools: schoolResult });
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

function runSchools(schools: SchoolInfo[], json: ExamResult[], grade: number) {
  const schoolCount = SCHOOLS.length;
  const studentsBySchool = groupBy(json, "学校");
  if (schoolCount != Object.keys(studentsBySchool).length) {
    alert("学校数量与系统中配置的不一致");
  }

  const schoolNames = SCHOOLS.map((e) => e.学校名称);
  const schoolNamesFromExamResult = Object.keys(studentsBySchool);
  const config = TOTAL_SCORE_METRICS[grade];

  if (
    JSON.stringify(schoolNames.sort()) !=
    JSON.stringify(schoolNamesFromExamResult.sort())
  ) {
    alert("学校与系统中配置的不一致");
  }

  for (const [schoolName, students] of Object.entries(studentsBySchool)) {
    const school = schools.find((e) => e.校区 === schoolName);
    if (!school) {
      throw Error("学校未找到" + schoolName);
    }
    const totalScoreField = KEY_MAPPING[grade].totalScore;
    const totalScores = students.map((e) => Number(e[totalScoreField]));
    const attendCount = totalScores.filter((e) => !!e).length;

    // todo: 校验参数是否配置

    const qualifiedCount = totalScores.filter(
      (e) => e > config.qualifiedThreshold
    ).length;
    const excellentCount = totalScores.filter(
      (e) => e > config.excellentThreshold
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
    school["年级总分（含加分）"] = students
      .map((e) => Number(e["总分（含加分）"]))
      .reduce((arr, score) => arr + score, 0);
    school.年级总平均分 = averageScore;
    school.实考数 = attendCount;
    // school.全科合格数 = fullyQualifiedCount;
    school.巩固率 = attendCount / school.应考数;
    school.合格数 = qualifiedCount;
    school.合格率 = qualifiedCount / school.应考数;
    school.优生数 = excellentCount;
    school.优生率 = excellentCount / school.应考数;
    school.巩固率计算得分 = 20 - (100 - school.巩固率 * 100) * 2;
    school.巩固率实际得分 = 20 - (100 - school.巩固率 * 100) * 2;

    // todo: 学校综合成绩也分区域的

    const metricWeightConfig = getMetricWeightConfigBySchool(school.校区);

    school.综合成绩 =
      school.年级总平均分 * metricWeightConfig.averageScore +
      school.合格率 * 100 * metricWeightConfig.qualifiedRate +
      school.优生率 * 100 * metricWeightConfig.excellentRate +
      school.巩固率实际得分;
  }

  return schools;
}

function runTeachers(
  teacherInfos: TeacherInfo[],
  json: ExamResult[],
  grade: number
) {
  const config = SUBJECT_SCORE_METRICS[grade];

  const teachers = teacherInfos.map((e) => {
    return {
      ...e,
      classes: parseClasses((e["班级"] as string).replace("班", "")).map(
        (c, i, arr) => e["学校"] + c + "班"
      ),
    };
  });

  const studentsByClass = groupBy(json, (e) => e["学校"] + e["班级"]);

  for (const [key, students] of Object.entries(studentsByClass)) {
    const targetTeachers = teachers.filter((t) => {
      if (!t.classes?.length) {
        throw Error("教师班级字符串解析错误：" + t.班级);
      }
      return t.classes.includes(key);
    });
    if (!targetTeachers.length) {
      throw Error("在教师表中未找到学生班级: " + key);
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
        if (!(subject in config)) {
          throw Error("找不到科目的指标配置：" + subject);
        }
        return e >= config[subject].qualifiedThreshold;
      }).length;

      const excellentCount = scores.filter((e) => {
        return e >= config[subject].excellentThreshold;
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
    const config = getConfigByTeacher(teacher);

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
