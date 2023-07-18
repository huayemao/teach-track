import { EDU_STAGE_MAPPING, Report } from "@/constants/index";

export const getFullReportTitle = (report: Report) =>
  report.attributes.region +
  report.attributes.year +
  "-" +
  (report.attributes.year + 1) +
  "学年" +
  report.attributes.title +
  `（${EDU_STAGE_MAPPING[report.attributes.eduStage]}）`;
