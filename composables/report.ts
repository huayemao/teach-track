import { REPORT_ID_EDU_STAGE_MAPPING } from "@/constants/index";

export const useReport = () => {
  const route = useRoute();

  const reportId = route.params.id.toString();

  const eduStage = REPORT_ID_EDU_STAGE_MAPPING[reportId];
  return {
    eduStage,
  };
};
