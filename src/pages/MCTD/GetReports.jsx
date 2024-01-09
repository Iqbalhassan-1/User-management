import React from "react";
import {
  Button,
  Card,
  CustomSelect,
  SectionTitle,
  Status,
  Wrapper,
} from "../../components";
import { useQuery } from "@tanstack/react-query";
import { getAllReports } from "../../api/mctdService";
import { useForm } from "react-hook-form";

const people = [
  {
    name: "John Doe",
    title: "Front-end Developer",
    department: "Engineering",
    email: "john@devui.com",
    role: "Developer",
    image:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80",
  },
  {
    name: "Jane Doe",
    title: "Back-end Developer",
    department: "Engineering",
    email: "jane@devui.com",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
  },
];
const option = ["Million", "Billion", "Trillion"];

const GetReports = () => {
  const {
    register,
    handleSubmit,
    formState: errors,
    watch,
    setValue,
  } = useForm();
  const selectedId = watch("proposal");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getReports", selectedId],
    queryFn: () => getAllReports(selectedId),
  });
  const unique_array = [...new Set(data)];
  console.log("data", unique_array, selectedId);

  return (
    <Wrapper className="space-y-6">
      <Card className="flex-btw">
        <div className="min-w-max">
          <CustomSelect
            name="proposal"
            register={register}
            errors={errors}
            fisrtOp="Select Proposal"
            isOptional
          >
            {unique_array?.map((option) => (
              <option value={option?._id} key={option?._id}>
                {option?.programId?.title}
              </option>
            ))}
          </CustomSelect>
        </div>
        <Button size="sm" className="text-sm lg:text-base">
          Download Reports
        </Button>
      </Card>
      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr className="divide-x divide-gray-200">
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      Proposal
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-start text-gray-500"
                    >
                      Municipality
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.map((person) => (
                    <tr key={person?._id} className="divide-x divide-gray-200">
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {person.programId?.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {person?.programId?.reference_no}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {person.muncipality_info?.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {person?.muncipality_info?._id}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <Status status={person?.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default GetReports;
