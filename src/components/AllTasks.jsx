import React from "react";
import { Empty, Space, Table, Tag } from "antd";
import { useSelector } from "react-redux";

const AllTasks = () => {
  const data = useSelector((state) => state.todo.items);
  if(data.length == 0){
    return <div className="w-[100vw] h-[80vh] flex items-center justify-center">
        <Empty />
    </div>
  }
  return (
    <div className="">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Id
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Date Created
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Time Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item) => {
                    return (
                      <tr className="border-b border-neutral-200 dark:border-white/10 bg-gray-600">
                        <td className="whitespace-nowrap px-6 py-4 text-gray-300">
                          {item?.id}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-300">{item?.taskName}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-300">{item?.taskDesc}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-300">{item?.addedDate}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-gray-300">{item?.addedTime}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
