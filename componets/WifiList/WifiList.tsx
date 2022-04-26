import { View, Text } from 'react-native'
import React from 'react'
import { DataTable } from 'react-native-paper';
import WifiListItem from './WifiListItem';


const optionsPerPage = [2, 3, 5];



const WifiList = ({ wifiList }) => {
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Available Networkds</DataTable.Title>
        <DataTable.Title numeric>Signal Quality</DataTable.Title>
      </DataTable.Header>

      {wifiList.map((listItem) => {
        const level = listItem.level;
        const ssid = listItem.SSID;
        return <WifiListItem level={level} ssid={ssid} />
      })}

      <DataTable.Pagination
        page={page}
        numberOfPages={3}
        onPageChange={(page) => setPage(page)}
        label="1-2 of 6"
        optionsPerPage={optionsPerPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={'Rows per page'}
      />
    </DataTable>
  )
}

export default WifiList;