import React, {useCallback, useEffect, useRef, useState} from "react";
import {useLoaderData, useNavigate,useParams } from "react-router-dom";
import {HFlex, HFlexCC, HFlexSC, TextXs, VFlex, VFlexCC, VFlexCS} from '../bits/UtilityTags.js';
import {
  Box, Button, Center, Flex, Link, Image, SimpleGrid, Heading, Avatar, Spinner,Text,
  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Badge, Input,
} from "@chakra-ui/react";
import {useSF, sfState, setSfView} from "../../services/useSF";
import {wsSend} from "../../services/useWS";
import Select from "react-select";
import {BsArrowBarLeft, BsArrowBarRight, BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs";
import HistoryTable from "./Tables/HistoryTable";

export const SFHistory = ({...rest}) => {

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState({});
  const [filter, setFilter] = useState({});
  const masterLog = useSF(s => s.masterLog);
  const totalPages = useSF(s => s.totalPages);
  const totalItems = useSF(s => s.totalItems);
  const currentPage = useSF(s => s.currentPage);
  const pageSize = useSF(s => s.pageSize);

  const handleSortAscClick = () => setSort({ status: 1 });
  const handleSortDescClick = () => setSort({ status: -1 });

  // Fetch new masterLog data whenever page, size, sort, or filter state changes


  // Handler for the Select input change event.
  const handlePageSizeChange = (selectedOption) => {
    setSize(selectedOption.value);
  };

  return (<>
    <Heading as='h1'>History</Heading>
    {/* Filtering */}
    <HistoryTable/>
 </>);
}
