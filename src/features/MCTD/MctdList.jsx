import { useQuery } from "@tanstack/react-query";
import MunicipalityItem from "./MunicipalityItem";
import { getExpertByStageId } from "../../api/mctdService";
import {
  Card,
  DebounceInput,
  LoadingItemPlaceholder,
  NoDataAvailable,
} from "../../components";
import { memo, useState } from "react";
import useDataContext from "../../utils/hooks/useDataContext";
import { useTranslation } from "react-i18next";
import MctdItem from "./MctdItem";

const MctdList = ({ openModal }) => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-Mctdies", "MCTD", "", search],
    queryFn: () => getExpertByStageId("MCTD", "", search),
  });

  // if (isLoading) {
  //   return <LoadingItemPlaceholder />;
  // }

  if (isError) {
    return <p>{error?.message}</p>;
  }

  const handleSearch = (text) => setSearch(text);

  return (
    <Card className="p-0 sm:p-0 divide-y divide-gray-200 rounded-b-lg">
      <div className="p-4">
        <DebounceInput value={search} onChange={handleSearch} />
      </div>
      {isLoading ? (
        <LoadingItemPlaceholder />
      ) : data?.length > 0 ? (
        data?.map((mctdItem, index) => {
          return <MctdItem key={index} data={mctdItem} openModal={openModal} />;
        })
      ) : (
        <NoDataAvailable />
      )}
    </Card>
  );
};

export default memo(MctdList);
