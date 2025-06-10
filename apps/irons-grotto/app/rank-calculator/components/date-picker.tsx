import 'react-datepicker/dist/react-datepicker.css';

import { PropsWithChildren } from 'react';
import BaseDatePicker, {
  DatePickerProps as BaseDatePickerProps,
  ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';
import { FieldPath, FieldValues, useController } from 'react-hook-form';
import { Card, Flex, IconButton, Text } from '@radix-ui/themes';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Input } from './input';

function CalendarContainer({ children }: PropsWithChildren) {
  return <Card size="2">{children}</Card>;
}

function CalendarHeader({
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  monthDate,
}: ReactDatePickerCustomHeaderProps) {
  return (
    <Flex justify="between" align="center">
      <IconButton
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        variant="ghost"
        style={{ margin: 0 }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <Text>{format(monthDate, 'MMMM yyyy')}</Text>
      <IconButton
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        variant="ghost"
        style={{ margin: 0 }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Flex>
  );
}

interface DatePickerProps<T extends FieldValues> {
  name: FieldPath<T>;
  size?: '1' | '2' | '3';
}

export function DatePicker<T extends FieldValues>({
  name,
  size = '2',
  customInput,
  ...props
}: DatePickerProps<T> &
  Pick<
    BaseDatePickerProps,
    'customInput' | 'isClearable' | 'placeholderText' | 'required' | 'disabled'
  >) {
  const { field, fieldState } = useController<T, typeof name>({
    name,
    disabled: props.disabled,
    rules: {
      required: props.required,
    },
  });

  return (
    <BaseDatePicker
      {...props}
      {...field}
      selected={field.value ? new Date(field.value) : null}
      dateFormat="dd/MM/yyyy"
      maxDate={new Date()}
      customInput={
        customInput ?? <Input hasError={!!fieldState.error} size={size} />
      }
      portalId="theme-root"
      calendarClassName="rt-PopoverContent rt-r-size-2"
      renderDayContents={(day) => <Text size="2">{day}</Text>}
      renderCustomHeader={CalendarHeader}
      calendarContainer={CalendarContainer}
      showWeekNumbers={false}
    />
  );
}
