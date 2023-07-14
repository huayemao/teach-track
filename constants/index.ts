export const DEFAULT_TEACHER_METRIC_CONFIG_BY_REGION = [
  {
    name: "城区",
    averageScore: 0.5,
    qualifiedRate: 0.3,
    excellentRate: 0.2,
  },
  {
    name: "坝区",
    averageScore: 0.5,
    qualifiedRate: 0.4,
    excellentRate: 0.1,
  },
  {
    name: "山区",
    averageScore: 0.5,
    qualifiedRate: 0.4,
    excellentRate: 0.1,
  },
];

export const DEFAULT_SCHOOL_METRIC_CONFIG_BY_REGION = [
  {
    name: "城区",
    averageScore: 0.1,
    qualifiedRate: 0.4,
    excellentRate: 0.3,
  },
  {
    name: "坝区",
    averageScore: 0.1,
    qualifiedRate: 0.6,
    excellentRate: 0.1,
  },
  {
    name: "山区",
    averageScore: 0.1,
    qualifiedRate: 0.6,
    excellentRate: 0.1,
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

export const SUBJECT_SCORE_METRICS = {
  7: {
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
  },
};

export const TOTAL_SCORE_METRICS = {
  7: {
    excellentThreshold: 360,
    qualifiedThreshold: 270,
  },
  8: {
    excellentThreshold: 400,
    qualifiedThreshold: 300,
  },
  9: {
    excellentThreshold: 492,
    qualifiedThreshold: 384,
  },
};

export const KEY_MAPPING = {
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
  3: "三年级",
  4: "四年级",
  5: "五年级",
  6: "六年级",
  7: "七年级",
  8: "八年级",
  9: "九年级",
};

export const DEFAULT_SUBMISSIONS = [
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
