import React from "react";
import styled from "styled-components";

const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.small ? 5 : undefined,
}))`
  border: 1px solid #303f9f;
  height: 32px;
  outline: none;
  width: 200px;
  padding: 0 32px 0 16px;
  border-radius: 3xp 0 0 3px;
`;

const ClearButton = styled.button`
  border-radius: 0 3px 3px 0;
  background: #303f9f;
  color: #fff;
  border: none;
  height: 32px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <Input
      id="search"
      type="text"
      placeholder="Filter table data..."
      value={filterText}
      onChange={onFilter}
    />
    <ClearButton onClick={onClear}>X</ClearButton>
  </>
);

export default FilterComponent;
