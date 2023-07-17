import { Report } from "@/constants/index";
export const getFullReportTitle = (report: Report) =>
  report.attributes.region +
  report.attributes.year +
  "-" +
  (report.attributes.year + 1) +
  "学年" +
  report.attributes.title +
  `（${report.attributes.eduStage}）`;
