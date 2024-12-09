import {
  HStack,
  Text,
  Select,
  ButtonGroup,
  IconButton,
  useEditableControls,
  Editable,
  EditableInput,
  EditablePreview,
  Input,
} from "@chakra-ui/react";
import { Pencil, Check, X } from "lucide-react";

const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" alignContent="center" mx="4" size="sm">
      <IconButton icon={<Check />} {...getSubmitButtonProps()} />
      <IconButton icon={<X />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <ButtonGroup justifyContent="center" alignContent="center" mx="4" size="sm">
      <IconButton size="sm" icon={<Pencil />} {...getEditButtonProps()} />
    </ButtonGroup>
  );
};

const EditableSelect = ({ label, value, options, onChange }) => (
  <HStack>
    <Text fontWeight="bold">{label}:</Text>
    <Editable defaultValue={value} isPreviewFocusable={false}>
      <EditablePreview />
      <Input as={EditableInput} />
      <EditableControls />
    </Editable>
    <Select value={value} onChange={onChange} size="sm" width="auto">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </Select>
  </HStack>
);

export { EditableSelect };
