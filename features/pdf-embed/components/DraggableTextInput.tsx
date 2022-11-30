import Draggable from "react-draggable";
import { Paper, UnstyledButton } from "@mantine/core";
import ContentEditable from "react-contenteditable";
import { IconDotsVertical } from "@tabler/icons";
import { useRef, useState } from "react";
const defaultState = {
  activeDrags: 0,
  deltaPosition: {
    x: 0,
    y: 0,
  },
  controlledPosition: {
    x: -400,
    y: 200,
  },
};

type Field = {
  name: string;
};
type Props = {
  field: Field;
};

function DraggableTextInput({ field }: Props) {
  const nodeRef = useRef(null);
  const [state, setState] = useState(defaultState);
  const [fieldName, setFieldName] = useState(field.name);

  const handleDrag = (e: any, ui: any) => {
    const { x, y } = state.deltaPosition;
    setState((state) => ({
      ...state,
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    }));
  };

  const onStart = () => {
    setState((state) => ({ ...state, activeDrags: ++state.activeDrags }));
  };

  const onStop = () => {
    setState((state) => ({ ...state, activeDrags: --state.activeDrags }));
  };
  const onDrop = (e: any) => {
    setState((sate) => ({ ...state, activeDrags: --state.activeDrags }));
    if (e.target.classList.contains("drop-target")) {
      alert("Dropped!");
      e.target.classList.remove("hovered");
    }
  };
  const onDropAreaMouseEnter = (e: any) => {
    if (state.activeDrags) {
      e.target.classList.add("hovered");
    }
  };
  const onDropAreaMouseLeave = (e: any) => {
    e.target.classList.remove("hovered");
  };

  // For controlled component
  const adjustXPos = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = state.controlledPosition;
    setState((state) => ({ ...state, controlledPosition: { x: x - 10, y } }));
  };

  const adjustYPos = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { controlledPosition } = state;
    const { x, y } = controlledPosition;
    setState((staete) => ({ ...state, controlledPosition: { x, y: y - 10 } }));
  };

  const onControlledDrag = (e: any, position: any) => {
    const { x, y } = position;
    setState((state) => ({ ...state, controlledPosition: { x, y } }));
  };

  const onControlledDragStop = (e: any, position: any) => {
    onControlledDrag(e, position);
    onStop();
  };
  const dragHandlers = { onStart: onStart, onStop: onStop };
  const { deltaPosition, controlledPosition } = state;
  return (
    <Draggable nodeRef={nodeRef} {...dragHandlers}>
      <Paper
        shadow={"xs"}
        radius="xs"
        style={{
          width: "max-content",
          padding: "0.2rem 1.2rem 0.2rem 0.2rem",
          minWidth: "10rem",
          marginTop: "auto",
          display: "flex",
        }}
        ref={nodeRef}
      >
        <UnstyledButton>
          <IconDotsVertical />
        </UnstyledButton>
        <ContentEditable
          html={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
        />
      </Paper>
    </Draggable>
  );
}

export default DraggableTextInput;
