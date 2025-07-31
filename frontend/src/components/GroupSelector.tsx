'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface GroupSelectorProps {
    groups: string[];
    onGroupSelect: (groupIndex: number) => void;
}

export function GroupSelector({ groups, onGroupSelect }: GroupSelectorProps) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState('');

    return (
        <div className="ml-auto">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between">
                        {value ? groups.find(group => group === value) : 'Select group...'}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search group..." className="h-9" />
                        <CommandList>
                            <CommandEmpty>No group found.</CommandEmpty>
                            <CommandGroup>
                                {groups.map((group, index) => (
                                    <CommandItem
                                        key={group}
                                        value={group}
                                        onSelect={currentValue => {
                                            onGroupSelect(index);
                                            setValue(currentValue);
                                            setOpen(false);
                                        }}>
                                        {group}
                                        <Check
                                            className={cn('ml-auto', value === group ? 'opacity-100' : 'opacity-0')}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
}
