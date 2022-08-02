import * as React from "react";
import { TextInput, TextInputProps } from "@mantine/core";
import { z } from "zod";

interface UrlInputProps extends TextInputProps {}
const urlSchema = z.string().url();

const UrlInput = React.forwardRef<HTMLInputElement, UrlInputProps>(
  (props, ref) => {
    const { onChange, error: parentError } = props;
    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
      if (onChange) {
        onChange(ev);
      }

      const error = urlSchema.safeParseAsync(ev.currentTarget.value);
      error.then((validation) => {
        console.debug("UrlInput validation", validation);
        if (!validation.success) {
          setError(validation.error.issues[0].message);
        } else {
          setError(null);
        }
      });
    };
    const [error, setError] = React.useState(parentError);
    return (
      <TextInput
        ref={ref}
        error={parentError ?? error}
        onChange={changeHandler}
        {...props}
      />
    );
  }
);

UrlInput.displayName = "UrlInput";

export default UrlInput;
