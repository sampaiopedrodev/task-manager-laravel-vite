
export type MenuProp = {
  name: string,
  icon: string | null,
  uri: string | null,
  type?:'collapse'|'item',
  children?: MenuProp[],
};

