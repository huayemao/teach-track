import { SchoolInfo, TeacherInfo } from "@/utils/process";
import localforage from "localforage";
export async function getGradeResults(
  reportId: number,
  grades: number[]
): Promise<
  Record<
    number,
    {
      teachers: TeacherInfo[] | undefined;
      schools: SchoolInfo[] | undefined;
    }
  >
> {
  const entries = await Promise.all(
    grades.map(async (grade) => {
      const [teachers, schools] = await Promise.all(
        ["teachers", "schools"].map((e) =>
          localforage.getItem([reportId, grade, e].join("-"))
        )
      );
      return [
        grade,
        {
          teachers,
          schools,
        },
      ];
    })
  );
  return Object.fromEntries(entries);
}
