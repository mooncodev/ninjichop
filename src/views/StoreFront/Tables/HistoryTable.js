import {
  Badge, Box, Button, Center, Icon, Select,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel, Checkbox, Spacer,
  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Tag, TagLabel, TagRightIcon,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import DebouncedInput from './ReactTable/DebouncedInput.js';
import { fuzzyFilter } from './ReactTable/filters.js';
import { PaginationButtons } from './PaginationButtons.js';
import { BiLinkExternal } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { ColFilter } from './ColFilter.js';
import {useSF} from "../../../services/useSF";
import {wsSend} from "../../../services/useWS";
import {HFlex, HFlexCC, HFlexSC, VFlex} from "../../bits/UtilityTags";
import {BsFillFileArrowDownFill, BsFillFileArrowUpFill} from "react-icons/bs";
import {MdOpenInFull} from "react-icons/md";
import {surr4s} from "../../../helpers/math/zmath.mjs";

const fns = require('date-fns')

function resetAll(table){
  table.reset();table.resetColumnFilters();table.resetColumnOrder();
  table.resetColumnPinning();table.resetColumnSizing();table.resetColumnVisibility();
  table.resetExpanded();table.resetGlobalFilter();table.resetGrouping();
  table.resetHeaderSizeInfo();table.resetPageIndex();table.resetPageSize();
  table.resetPagination();table.resetRowSelection();table.resetSorting();
}
function masterLogFetchRepeater(){
  wsSend({ type: 'getMasterLog' });
  const masterLogInterval = setInterval(()=>{
    wsSend({ type: 'getMasterLog' });
  }, 5000);
  return () => clearInterval(masterLogInterval);
}
function masterLogFetch(){
  wsSend({ type: 'getMasterLog' });
}


export default function HistoryTable(props) {
  const rerender = React.useReducer(() => ({}), {})[1]
  const masterLog = useSF(s => s.masterLog);
  const [data, setData] = React.useState({});

  const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [columnVisibility, setColumnVisibility] = React.useState({})

  useEffect(masterLogFetch,[]);

  const columns = React.useMemo(
    () => [
      // {
      //   accessorKey: 'orderNumber',
      //   header: '#',
      //   cell: info => info.getValue(),
      // },
      {
        header: 'Order',
        accessorKey: 'orderNumber',
        enableHiding:false,
        cell: info => {
          const orderNumber = info.getValue();
          const color = info.row.original.orderColor
          return (
            <Tag as={Button} size='xl' bgColor={color} p={2} textAlign='center' onClick={()=>{
              useSF.getState().set_activityItemModalIsOpen(true, {orderNumber:info.getValue()})
            }}>
              <TagLabel>{orderNumber}</TagLabel>
              <TagRightIcon as={MdOpenInFull}/>
            </Tag>
          )
        },
      },
      // {
      //   header: 'Order',
      //   accessorFn: ({orderNumber, orderColor, stationName, totalPrice})=> {
      //     return {orderNumber, orderColor, stationName, totalPrice};
      //   },
      //   cell: info => {
      //     const v = info.getValue();
      //     return (<>
      //       <VFlex>
      //         <Box><Center w={'100%'}><Badge size='xl' bgColor={v.orderColor} w={'100%'}>#{v.orderNumber}</Badge></Center></Box>
      //         <Box fontWeight={'bold'}>${v.totalPrice}</Box>
      //       </VFlex>
      //     </>)
      //   },
      // },
      {
        accessorKey: 'stationName',
        header: 'Station',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'totalPrice',
        header: 'Total',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'status',
        header: 'status',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'label',
        header: 'Currency',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'symbol',
        header: 'Symbol',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: info => info.getValue(),
      },
      // {
      //   id: 'timeCreated',//required with accessorFn
      //   header: 'timeCreated',
      //   accessorFn: row => {
      //     return fns.format(new Date(row.inServiceDate), 'dd/MM/yyyy')
      //   },
      //   cell: info => info.getValue(),
      // },
      // {
      //   id: 'timeLastUpdated',//required with accessorFn
      //   header: 'timeLastUpdated',
      //   accessorFn: row => {
      //     return fns.format(new Date(row.inServiceDate), 'dd/MM/yyyy')
      //   },
      //   cell: info => info.getValue(),
      // },
      {
        header: 'Recipient',
        accessorKey: 'rcvrAddr',
        cell: info => {
          const value = info.getValue();
          return value ? surr4s(value) : null
        },
      },
      {
        header: 'Sender',
        accessorKey: 'senderAddr',
        cell: info => {
          const value = info.getValue();
          return value ? surr4s(value) : null
        },
      },
      {
        header: 'Tx Hash',
        accessorKey: 'txHash',
        cell: info => {
          const value = info.getValue();
          return value ? surr4s(value) : null
        },
      },
      // {
      //   accessorFn: row => `${row.firstName} ${row.lastName}`,
      //   id: 'fullName',
      //   header:  () => <span>Full Name</span>,
      //   cell: info => info.getValue(),
      //   footer: props => props.column.id,
      //   filterFn: 'fuzzy',
      //   sortingFn: fuzzySort,
      // },
    ],
    []
  )


  const table = useReactTable({
    data:masterLog,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      columnVisibility,
      hiddenColumns: ['orderColor']
    },
    initialState: {
      sortBy: [
        {
          id: 'orderNumber',
          asc: true
        }
      ]
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: false,
    debugHeaders: true,
    debugColumns: false,
  })


  return (
    <VFlex gap={2} sx={{padding: '1rem', width: '100vw',}}>

      {/* Column Visibility Toggles */}
      <Box w='260px' border="1px solid white">
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  Columns Visibility
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VFlex gap={2}>
                <HFlex gap={2} className="px-1 border-b border-black">
                  <Checkbox w='100%'
                            isChecked={table.getIsAllColumnsVisible()}
                            onChange={table.getToggleAllColumnsVisibilityHandler()}
                  >
                    <Box>Toggle All</Box>
                  </Checkbox>
                </HFlex>
                {table.getAllLeafColumns().map(column => {
                  if(!column.getCanHide()){return null;}
                  return (
                    <HFlex gap={2} key={column.id} className="px-1">
                      <Checkbox w='100%'
                                isChecked={column.getIsVisible()}
                                onChange={column.getToggleVisibilityHandler()}
                      >
                        <Box>{column.columnDef.header}</Box>
                      </Checkbox>
                    </HFlex>
                  )
                })}
              </VFlex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
      <HFlex w='100%' gap={5}>
        <DebouncedInput width='190px'
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          placeholder="Search all columns..."
        />
        <Select size='sm'
                width={'120px'}
                value={table.getState().pagination.pageSize}
                onChange={e => {
                  table.setPageSize(Number(e.target.value))
                }}
        >
          {[1, 5, 10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </Select>
        <Button size='sm' onClick={()=>{resetAll(table);}}>Reset</Button>
      </HFlex>
      <PaginationButtons table={table}/>
      <div>Total Records: {table.getPrePaginationRowModel().rows.length}</div>


      <TableContainer>
        <Table size='xs'>
          <Thead>
            {table.getHeaderGroups().map((headerGroup, i) => (
              <Tr key={headerGroup.id + i}>
                {headerGroup.headers.map((header, ii) => {
                  return (
                    <Th key={header.id + ii} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <>
                          <HFlexSC
                            fontSize={14}
                            cursor={header.column.getCanSort() ? 'pointer' : ''}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: <BsFillFileArrowUpFill/>,
                              desc: <BsFillFileArrowDownFill/>,
                            }[header.column.getIsSorted()] ?? null}
                          </HFlexSC>
                          {header.column.getCanFilter() ? (
                            <ColFilter column={header.column} table={table}/>
                          ) : null}
                        </>
                      )}
                    </Th>
                  )
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map(row => {
              return (
                <Tr key={row.id}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <Td key={cell.id} px={1}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    )
                  })}
                </Tr>
              )
            })}
          </Tbody>

        </Table>
      </TableContainer>

      <PaginationButtons table={table}/>

      <Box h={3}/>
      {/*<Button onClick={() => rerender()}>Force Rerender</Button>*/}
      {/*<Button onClick={masterLogFetch}>Refresh Data</Button>*/}
      {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
    </VFlex>
  )
}

// const Styles = styled.div`
//   padding: '1rem',
//   overflow: 'auto',
//   width: '100vw',
//   table {
//     border-spacing: 0;
//     border: 1px solid black;
//
//     tr {
//       :last-child {
//         td {
//           border-bottom: 0;
//         }
//       }
//     }
//
//     th,
//     td {
//       margin: 0;
//       padding: 0.5rem;
//       border-bottom: 1px solid black;
//       border-right: 1px solid black;
//
//       :last-child {
//         border-right: 0;
//       }
//     }
//
//     td {
//       input {
//         font-size: 1rem;
//         padding: 0;
//         margin: 0;
//         border: 0;
//       }
//     }
//   }
//
//   .pagination {
//     padding: 0.5rem;
//   }
// `
