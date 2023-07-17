import { DEFAULT_REPORTS, Report } from "@/constants/index";

export const useReport = () => {
  const route = useRoute();

  const reportId = route.params.id.toString();

  const report = DEFAULT_REPORTS.find((e) => e.id == reportId) as Report;
  return report;
};
