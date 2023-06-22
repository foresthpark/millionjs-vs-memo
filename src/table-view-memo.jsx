import { Table, TableContainer, Tbody, Th, Thead } from "@chakra-ui/react";
// import { block, For } from "million/react";
import { memo } from "react";

function Row({ product, count, random }) {
  return (
    <tr>
      <td className="text-center">{random}</td>
      <td className="text-center">{count}</td>
      <td className="text-center">{product}</td>
      {Array(100)
        .fill(0)
        .map((_, i) => (
          <td className="hidden">{i}</td>
        ))}
    </tr>
  );
}

// const RowBlock = block(Row);
const RowMemo = memo(Row);

const TableViewMemo = memo(function TableView({ array, count }) {
  return (
    <TableContainer>
      <Table size="md">
        <Thead>
          <Th className="text-center">Random</Th>
          <Th className="text-center">Count</Th>
          <Th className="text-center">Product</Th>
        </Thead>
        <Tbody>
          {array.map((random) => (
            <RowMemo product={count * random} random={random} count={count} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
});

export default TableViewMemo;
