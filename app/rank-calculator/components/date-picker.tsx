'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { PropsWithChildren } from 'react';
import BaseDatePicker, {
  DatePickerProps as BaseDatePickerProps,
  ReactDatePickerCustomHeaderProps,
} from 'react-datepicker';
import { useController } from 'react-hook-form';
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

interface DatePickerProps {
  name: string;
}

export function DatePicker({
  name,
  ...props
}: DatePickerProps & BaseDatePickerProps) {
  const { field, fieldState } = useController({ name });

  return (
    <BaseDatePicker
      {...props}
      {...field}
      selected={field.value}
      dateFormat="dd-MM-yyyy"
      maxDate={new Date()}
      customInput={<Input hasError={!!fieldState.error} />}
      portalId="theme-root"
      calendarClassName="rt-PopoverContent rt-r-size-2"
      renderDayContents={(day) => <Text size="2">{day}</Text>}
      renderCustomHeader={CalendarHeader}
      calendarContainer={CalendarContainer}
      showWeekNumbers={false}
    />
  );
}
