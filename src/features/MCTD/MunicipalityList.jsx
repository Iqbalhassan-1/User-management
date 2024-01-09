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

const MunicipalityList = ({ openModal }) => {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["get-All-Muncipilities", "Municipality", "", search],
    queryFn: () => getExpertByStageId("Municipality", "", search),
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
        data?.map((muncItem, index) => {
          return (
            <MunicipalityItem
              key={index}
              data={muncItem}
              openModal={openModal}
            />
          );
        })
      ) : (
        <NoDataAvailable />
      )}
    </Card>
  );
};

export default memo(MunicipalityList);
