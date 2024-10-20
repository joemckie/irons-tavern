import { Select as BaseSelect, Button } from '@radix-ui/themes';
import * as Ariakit from '@ariakit/react';
import { useController } from 'react-hook-form';

interface SelectProps extends BaseSelect.RootProps {
  name: string;
  placeholder?: string;
  options: string[];
}

export function Select({ options, placeholder, ...props }: SelectProps) {
  const { field } = useController({ name: props.name });

  return (
    <Ariakit.SelectProvider setValue={field.onChange} value={field.value}>
      <Button asChild variant="ghost" size="1">
        <Ariakit.Select {...field} />
      </Button>
      <Ariakit.SelectPopover
        gutter={4}
        // sameWidth
        className="rt-PopperContent rt-PopoverContent rt-r-size-1"
        portal
        portalElement={document.getElementById('theme-root')}
        // unmountOnHide
        style={{
          fontSize: 'var(--font-size-1)',
        }}
      >
        {options.map((option) => (
          <Ariakit.SelectItem
            key={option}
            className="select-item"
            value={option}
          />
        ))}
      </Ariakit.SelectPopover>
    </Ariakit.SelectProvider>
  );
}
