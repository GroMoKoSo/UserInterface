import { useMemo, useState } from 'react';
import {
  ActionIcon,
  Center,
  Group,
  ScrollArea,
  Stack,
  Table,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconPencil,
  IconSearch,
  IconSelector,
  IconTrash,
} from '@tabler/icons-react';
import React from 'react';

/** --- Types ---------------------------------------------------------------- */

export type ColumnKey<T> = keyof T;

export interface ColumnDef<T> {
  /** key in data object (used for default rendering & fallback sorting) */
  key: ColumnKey<T>;
  /** optional header label; defaults to String(key).toUpperCase() */
  label?: React.ReactNode;
  /** enable/disable sorting for this column (default: true) */
  sortable?: boolean;
  /** enable/disable searching for this column (default: true) */
  searchable?: boolean;
  /**
   * Custom render for cell value (receives entire row).
   * If omitted, renders `row[key]` as string/number/ReactNode.
   */
  render?: (row: T, rowIndex: number) => React.ReactNode;
  /**
   * Value used for sort/filter (string|number recommended).
   * If omitted, falls back to `row[key]`.
   */
  getValue?: (row: T) => string | number | null | undefined;
}

type ColumnsProp<T> = Array<ColumnKey<T>> | Array<ColumnDef<T>>;

export interface MyTableProps<T> {
  data: T[];
  columns: ColumnsProp<T>;
  /** show search input (default: true) */
  enableSearch?: boolean;
  /** enable sorting (default: true) */
  enableSort?: boolean;
  /** placeholder for search input */
  searchPlaceholder?: string;
  /** optional callbacks for actions column */
  onEdit?: (row: T, rowIndex: number) => void;
  onDelete?: (row: T, rowIndex: number) => void;
  /** show action column (default: true if onEdit/onDelete exist) */
  showActions?: boolean;
  /** initial sort column key (must be one of the provided column keys) */
  initialSortKey?: ColumnKey<T>;
  /** initial sort direction (default: 'asc') */
  initialSortDirection?: 'asc' | 'desc';
  /** table height (ScrollArea) */
  height?: number | string;
}

/** --- Helpers -------------------------------------------------------------- */

function toColumnDefs<T>(cols: ColumnsProp<T>): ColumnDef<T>[] {
  if (!cols.length) return [];
  const isDef = (c: any): c is ColumnDef<T> => typeof c === 'object' && 'key' in c;
  return (cols as any[]).map((c) =>
    isDef(c)
      ? {
        sortable: true,
        searchable: true,
        ...c,
      }
      : ({
        key: c as ColumnKey<T>,
        label: String(c).toUpperCase(),
        sortable: true,
        searchable: true,
      } as ColumnDef<T>)
  );
}

function getCellValue<T>(col: ColumnDef<T>, row: T): string | number | null | undefined {
  if (col.getValue) return col.getValue(row);
  const v = row[col.key] as any;
  // For search/sort we only work with primitive values
  if (typeof v === 'string' || typeof v === 'number') return v;
  return typeof v === 'boolean' ? Number(v) : undefined;
}

function compare(a: string | number | null | undefined, b: string | number | null | undefined) {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b));
}

/** --- Header cell with sort control --------------------------------------- */

interface ThProps {
  children: React.ReactNode;
  sorted: boolean;
  reversed: boolean;
  onSort?: () => void;
  sortable: boolean;
}

function Th({ children, sorted, reversed, onSort, sortable }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  if (!sortable) {
    return (
      <Table.Th>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center style={{ width: 16 }} />
        </Group>
      </Table.Th>
    );
  }
  return (
    <Table.Th>
      <UnstyledButton onClick={onSort} style={{ width: '100%' }}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center style={{ width: 16 }}>
            <Icon size={16} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

/** --- Component ------------------------------------------------------------ */

export function MyTable<T>({
  data,
  columns,
  enableSearch = true,
  enableSort = true,
  searchPlaceholder = 'Search by any field',
  onEdit,
  onDelete,
  showActions,
  initialSortKey,
  initialSortDirection = 'asc',
  height = '80vh',
}: MyTableProps<T>) {
  const columnDefs = useMemo(() => toColumnDefs(columns), [columns]);

  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<ColumnKey<T> | null>(initialSortKey ?? null);
  const [reverse, setReverse] = useState(initialSortDirection === 'desc');

  const actionsEnabled = showActions ?? Boolean(onEdit || onDelete);

  const filteredSorted = useMemo(() => {
    // 1) filter
    const lc = search.toLowerCase().trim();
    const searchableCols = columnDefs.filter((c) => c.searchable !== false);
    const filtered = !enableSearch || lc === ''
      ? data
      : data.filter((row) =>
        searchableCols.some((c) => {
          const v = getCellValue(c, row);
          return v != null && String(v).toLowerCase().includes(lc);
        })
      );

    // 2) sort
    if (!enableSort || !sortKey) return filtered;

    const col = columnDefs.find((c) => c.key === sortKey);
    if (!col || col.sortable === false) return filtered;

    const sorted = [...filtered].sort((a, b) => compare(getCellValue(col, a), getCellValue(col, b)));
    return reverse ? sorted.reverse() : sorted;
  }, [data, columnDefs, search, enableSearch, sortKey, enableSort, reverse]);

  const handleSort = (key: ColumnKey<T>) => {
    if (!enableSort) return;
    setReverse((prev) => (key === sortKey ? !prev : false));
    setSortKey(key);
  };

  return (
    <Stack>
      {enableSearch && (
        <TextInput
          placeholder={searchPlaceholder}
          mb="md"
          leftSection={<IconSearch size={16} stroke={1.5} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      )}

      <ScrollArea h={height}>

        <Table verticalSpacing="sm" horizontalSpacing="xl" striped highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              {columnDefs.map((col) => {
                const label = col.label ?? String(col.key).toUpperCase();
                const sorted = sortKey === col.key;
                return (
                  <Th
                    key={String(col.key)}
                    sorted={sorted}
                    reversed={reverse}
                    onSort={() => handleSort(col.key)}
                    sortable={col.sortable !== false}
                  >
                    {label}
                  </Th>
                );
              })}
              {actionsEnabled && <Table.Th />}
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {filteredSorted.length > 0 ? (
              filteredSorted.map((row, rowIndex) => (
                <Table.Tr key={rowIndex}>
                  {columnDefs.map((col) => (
                    <Table.Td key={`${String(col.key)}-${rowIndex}`}>
                      {col.render
                        ? col.render(row, rowIndex)
                        : ((row as any)[col.key] as string | number | React.ReactNode)}
                    </Table.Td>
                  ))}
                  {actionsEnabled && (
                    <Table.Td>
                      <Group gap={0} justify="flex-end">
                        {onEdit && (
                          <ActionIcon
                            variant="subtle"
                            color="gray"
                            onClick={() => onEdit(row, rowIndex)}
                            aria-label="Edit"
                            title="Edit"
                          >
                            <IconPencil size={16} stroke={1.5} />
                          </ActionIcon>
                        )}
                        {onDelete && (
                          <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => onDelete(row, rowIndex)}
                            aria-label="Delete"
                            title="Delete"
                          >
                            <IconTrash size={16} stroke={1.5} />
                          </ActionIcon>
                        )}
                      </Group>
                    </Table.Td>
                  )}
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={columnDefs.length + (actionsEnabled ? 1 : 0)}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </Stack>

  );
}
