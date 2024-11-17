"use client";
import { Flex, Input, Select, IconButton } from "@chakra-ui/react";
import { Search, SquareChevronUp, SquareChevronDown } from "lucide-react";

export default function FilterControls({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) {
  return (
    <Flex wrap="wrap" gap={4}>
      <Flex align="center">
        <Search mr={2} />
        <Input
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Flex>
      <Select
        placeholder="Filter by status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="All">All Statuses</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </Select>
      <Select
        placeholder="Sort by"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Name</option>
        <option value="dueDate">Due Date</option>
      </Select>
      <IconButton
        icon={sortOrder === "asc" ? <SquareChevronUp /> : <SquareChevronDown />}
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        aria-label="Sort order"
      />
    </Flex>
  );
}
