'use client';

import * as React from 'react';
import { Progress as ProgressPrimitive } from 'radix-ui';

import { cn } from '#/lib/utils.ts';

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root> & {
    colorFilled?: string;
    colorUnfilled?: string;
};

function Progress({ className, value, colorFilled, colorUnfilled, ...props }: ProgressProps) {
    return (
        <ProgressPrimitive.Root
            data-slot="progress"
            className={cn(
                'relative flex h-1 w-full items-center overflow-x-hidden rounded-none',
                className
            )}
            style={{ backgroundColor: colorUnfilled }}
            {...props}
        >
            <ProgressPrimitive.Indicator
                data-slot="progress-indicator"
                className="size-full flex-1 transition-all"
                style={{
                    transform: `translateX(-${100 - (value || 0)}%)`,
                    backgroundColor: colorFilled
                }}
            />
        </ProgressPrimitive.Root>
    );
}

export { Progress };
