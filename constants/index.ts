export const EDU_STAGE_MAPPING = {
  Junior: "初中",
  Elementary: "小学",
};

export const FIELD_LABEL_MAPPING = {
  METRIC_CONFIG: {
    regionName: "区域名称",
    averageScore: "平均分",
    qualifiedRate: "合格率",
    excellentRate: "优生率",
  },
};

export const DEFAULT_TEACHER_METRIC_CONFIG_BY_REGION = [
  {
    regionName: "城区",
    averageScore: 0.5,
    qualifiedRate: 0.3,
    excellentRate: 0.2,
  },
  {
    regionName: "坝区",
    averageScore: 0.5,
    qualifiedRate: 0.4,
    excellentRate: 0.1,
  },
  {
    regionName: "山区",
    averageScore: 0.5,
    qualifiedRate: 0.4,
    excellentRate: 0.1,
  },
];

export const DEFAULT_TEACHER_METRIC_CONFIG = [
  {
    regionName: "所有区域",
    averageScore: 0.5,
    qualifiedRate: 0.3,
    excellentRate: 0.2,
  },
];

export const DEFAULT_SCHOOL_METRIC_CONFIG_BY_REGION = [
  {
    regionName: "城区",
    averageScore: 0.1,
    qualifiedRate: 0.4,
    excellentRate: 0.3,
    fullyQualifiedRate: 0,
  },
  {
    regionName: "坝区",
    averageScore: 0.1,
    qualifiedRate: 0.6,
    excellentRate: 0.1,
    fullyQualifiedRate: 0,
  },
  {
    regionName: "山区",
    averageScore: 0.1,
    qualifiedRate: 0.6,
    excellentRate: 0.1,
    fullyQualifiedRate: 0,
  },
];

// 小学
/* 年级教学综合成绩=年级总平均分×0.1+年级总分合格率
×0.4+年级总分优秀率×0.3+年级学生全科合格率×0.2。其中
道德与法治、科学按成绩的 20%折算为学生总分。 */
// todo: 考虑是否可合并？
export const DEFAULT_SCHOOL_METRIC_CONFIG = [
  {
    regionName: "所有区域",
    averageScore: 0.1,
    qualifiedRate: 0.4,
    excellentRate: 0.3,
    fullyQualifiedRate: 0.2,
  },
];

export const SCHOOLS = [
  {
    区域类别: "城区",
    学校名称: "元谋一中",
  },
  {
    区域类别: "城区",
    学校名称: "元马中学",
  },
  {
    区域类别: "坝区",
    学校名称: "黄瓜园中学",
  },
  {
    区域类别: "坝区",
    学校名称: "老城中学",
  },
  {
    区域类别: "坝区",
    学校名称: "清和中学",
  },
  {
    区域类别: "坝区",
    学校名称: "物茂中学",
  },
  {
    区域类别: "坝区",
    学校名称: "培英中学",
  },
  {
    区域类别: "山区",
    学校名称: "羊街中学",
  },
  {
    区域类别: "山区",
    学校名称: "江边中学",
  },
  {
    区域类别: "山区",
    学校名称: "姜驿中学",
  },
  {
    区域类别: "山区",
    学校名称: "新华中学",
  },
];

// todo: 这个不同年级会有所不同，
// 九年级语文又是 72
// 要先录入各年级指标。。。

export const SCORE_THRESHOLD_BY_GRADE = {
  1: {
    total: {
      excellentThreshold: 180,
      qualifiedThreshold: 120,
    },
    语文: {
      excellentThreshold: 90,
      qualifiedThreshold: 60,
    },
    数学: {
      excellentThreshold: 90,
      qualifiedThreshold: 60,
    },
  },
  2: {
    total: {
      excellentThreshold: 180,
      qualifiedThreshold: 120,
    },
    语文: {
      excellentThreshold: 90,
      qualifiedThreshold: 60,
    },
    数学: {
      excellentThreshold: 90,
      qualifiedThreshold: 60,
    },
  },
  3: {
    total: {
      excellentThreshold: 212,
      qualifiedThreshold: 144,
    },
    语文: {
      excellentThreshold: 90,
      qualifiedThreshold: 60,
    },
    数学: {
      excellentThreshold: 90,
      qualifiedThreshold: 60,
    },
    科学: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    道德与法治: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
  },
  4: {
    total: {
      excellentThreshold: 212,
      qualifiedThreshold: 144,
    },
    语文: {
      excellentThreshold: 90,
      qualifiedThreshold: 60,
    },
    数学: {
      excellentThreshold: 90,
      qualifiedThreshold: 60,
    },
    科学: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    道德与法治: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
  },
  5: {
    total: {
      excellentThreshold: 212,
      qualifiedThreshold: 144,
    },
    语文: {
      excellentThreshold: 90,
      qualifiedThreshold: 60,
    },
    数学: {
      excellentThreshold: 90,
      qualifiedThreshold: 60,
    },
    科学: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    道德与法治: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
  },
  6: {
    total: {
      excellentThreshold: 212,
      qualifiedThreshold: 144,
    },
    语文: {
      excellentThreshold: 90,
      qualifiedThreshold: 60,
    },
    数学: {
      excellentThreshold: 90,
      qualifiedThreshold: 60,
    },
    科学: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    道德与法治: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
  },
  7: {
    total: {
      excellentThreshold: 360,
      qualifiedThreshold: 270,
    },
    语文: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    数学: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    英语: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    道德与法治: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    历史: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    地理: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    生物: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    音乐: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    美术: {
      excellentThreshold: 48,
      qualifiedThreshold: 36,
    },
  },
  8: {
    total: {
      excellentThreshold: 400,
      qualifiedThreshold: 300,
    },
    语文: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    数学: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    英语: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    物理: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    道德与法治: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    历史: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    地理: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    生物: {
      excellentThreshold: 72,
      qualifiedThreshold: 54,
    },
    信息技术: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    音乐: {
      excellentThreshold: 80,
      qualifiedThreshold: 60,
    },
    美术: {
      excellentThreshold: 48,
      qualifiedThreshold: 36,
    },
  },
  9: {
    语文: {
      excellentThreshold: 96,
      qualifiedThreshold: 72,
    },
    数学: {
      excellentThreshold: 96,
      qualifiedThreshold: 72,
    },
    英语: {
      excellentThreshold: 96,
      qualifiedThreshold: 72,
    },
    物理: {
      excellentThreshold: 60,
      qualifiedThreshold: 80,
    },
    化学: {
      excellentThreshold: 60,
      qualifiedThreshold: 80,
    },
    体育: {
      excellentThreshold: 60,
      qualifiedThreshold: 80,
    },
    道德与法治: {
      excellentThreshold: 60,
      qualifiedThreshold: 80,
    },
    历史: {
      excellentThreshold: 60,
      qualifiedThreshold: 80,
    },
    音乐: {
      excellentThreshold: 60,
      qualifiedThreshold: 80,
    },
    美术: {
      excellentThreshold: 60,
      qualifiedThreshold: 80,
    },
    total: {
      excellentThreshold: 492,
      qualifiedThreshold: 384,
    },
  },
};

export const FILED_MAPPING_BY_GRADE = {
  1: {
    totalScore: "折算总分",
  },
  2: {
    totalScore: "折算总分",
  },
  3: {
    totalScore: "折算总分",
  },
  4: {
    totalScore: "折算总分",
  },
  5: {
    totalScore: "折算总分",
  },
  6: {
    totalScore: "折算总分",
  },
  7: {
    totalScore: "折算总分",
  },
  8: {
    totalScore: "折算总分",
  },
  9: {
    totalScore: "文化总分（不含加分）",
  },
};

export const GRADE_MAPPING = {
  1: "一年级",
  2: "二年级",
  3: "三年级",
  4: "四年级",
  5: "五年级",
  6: "六年级",
  7: "七年级",
  8: "八年级",
  9: "九年级",
};

export const DEFAULT_SUBMISSIONS = [
  { grade: 1, eduStage: "Elementary" },
  { grade: 2, eduStage: "Elementary" },
  { grade: 3, eduStage: "Elementary" },
  { grade: 4, eduStage: "Elementary" },
  { grade: 5, eduStage: "Elementary" },
  { grade: 6, eduStage: "Elementary" },
  { grade: 7, eduStage: "Junior" },
  { grade: 8, eduStage: "Junior" },
  { grade: 9, eduStage: "Junior" },
];

export const REPORT_ID_EDU_STAGE_MAPPING: Record<
  string,
  "Elementary" | "Junior"
> = {
  "1": "Junior",
  "2": "Elementary",
};

export const SCHOOL_TEACHING_QUALITY_CONFIG_JUNIOR = [
  {
    key: 7,
    weight: 0.2,
    label: "七年级教学综合成绩",
  },
  {
    key: 8,
    weight: 0.2,
    label: "八年级教学综合成绩",
  },
  {
    key: 9,
    weight: 0.6,
    label: "六年级教学综合成绩",
  },
  {
    key: "predict",
    weight: 1,
    label: "预测目标完成成绩",
  },
  {
    key: "increment",
    weight: 1,
    label: "学校九年级教学质量增量",
  },
];

export const SCHOOL_TEACHING_QUALITY_CONFIG_ELEMENTARY = [
  {
    key: 3,
    weight: 0.15,
    label: "三年级教学综合成绩",
  },
  {
    key: 4,
    weight: 0.15,
    label: "四年级教学综合成绩",
  },
  {
    key: 5,
    weight: 0.15,
    label: "五年级教学综合成绩",
  },
  {
    key: 6,
    weight: 0.55,
    label: "六年级教学综合成绩",
  },
  {
    key: "predict",
    weight: 1,
    label: "预测目标完成成绩",
  },
];

export type Report = {
  id: number;
  attributes: {
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    eduStage: "Elementary" | "Junior";
    year: number;
    region: string;
    schoolResultConfig: typeof SCHOOL_TEACHING_QUALITY_CONFIG_JUNIOR;
    grades: number[];
  };
};

export const DEFAULT_REPORTS: Report[] = [
  {
    id: 1,
    attributes: {
      eduStage: "Junior",
      title: "教学质量分析",
      year: 2021,
      region: "元谋县",
      createdAt: "111",
      publishedAt: "111",
      updatedAt: "111",
      schoolResultConfig: SCHOOL_TEACHING_QUALITY_CONFIG_JUNIOR,
      grades: [7, 8, 9],
    },
  },
  {
    id: 2,
    attributes: {
      eduStage: "Elementary",
      title: "教学质量分析",
      year: 2021,
      region: "元谋县",
      createdAt: "111",
      publishedAt: "111",
      updatedAt: "111",
      schoolResultConfig: SCHOOL_TEACHING_QUALITY_CONFIG_ELEMENTARY,
      grades: [1, 2, 3, 4, 5, 6],
    },
  },
];
