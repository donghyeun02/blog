export type GateType = 'and' | 'or' | 'not' | 'xor' | 'nand' | 'nor' | 'xnor';
export type NodeType = GateType | 'inputCustom' | 'outputCustom';

export interface BinaryGateProps {
  inputA: number;
  inputB: number;
}

export interface UnaryGateProps {
  input: number;
}
