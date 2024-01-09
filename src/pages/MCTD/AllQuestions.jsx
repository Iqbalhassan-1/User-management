import React from "react";
import { Card, LoadingItemPlaceholder } from "../../components";
import { useQuery } from "@tanstack/react-query";
import { getAllQuestions } from "../../api/mctdService";
import { QuestionItem } from "../../features/MCTD";
import useDataContext from "../../utils/hooks/useDataContext";

const AllQuestions = () => {
  const { updateData, searchText } = useDataContext();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-Questions", searchText],
    queryFn: () => getAllQuestions(searchText),
    onSuccess: (fetchdata) => {
      updateData(fetchdata);
    },
  });

  if (isLoading) {
    return <LoadingItemPlaceholder />;
  }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  return (
    <Card className="p-0 sm:p-0 divide-y divide-gray-200 rounded-b-lg">
      {data?.map((details) => (
        <QuestionItem data={details} key={details?._id} />
      ))}
    </Card>
  );
};

export default AllQuestions;
