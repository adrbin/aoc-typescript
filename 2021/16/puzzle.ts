import { runPuzzles } from '../../utils.js';

enum PacketType {
  Sum = 0,
  Product = 1,
  Minimum = 2,
  Maximum = 3,
  Literal = 4,
  GreaterThan = 5,
  LessThan = 6,
  EqualTo = 7,
}

const VersionBitLength = 3;
const TypeBitLength = 3;
const PacketHeaderBitLength = VersionBitLength + TypeBitLength;
const LteralGroupBitLength = 5;
const OperatorPacketType0BitLength = 15;
const OperatorPacketType1BitLength = 11;

interface PacketHeader {
  version: number;
  type: PacketType;
}

interface Packet {
  packetHeader: PacketHeader;
  value?: number;
  i: number;
  subpackets: Packet[];
}

function part1(input: string[]) {
  const bitArray = createBitArray(input);
  const packet = parsePacket(bitArray)!;
  return sumVersions(packet);
}

function createBitArray(input: string[]) {
  return input
    .map(x => parseInt(x, 16))
    .map(x => x.toString(2).padStart(4, '0'))
    .flatMap(x => x.split(''))
    .map(x => parseInt(x));
}

function parsePacket(bitArray: number[], i = 0) {
  if (i >= bitArray.length) {
    return;
  }

  const packetHeader = parsePacketHeader(bitArray, i);
  if (packetHeader.type === PacketType.Literal) {
    return parseLiteralPacket(
      bitArray,
      packetHeader,
      i + PacketHeaderBitLength,
    );
  }

  return parseOperatorPacket(bitArray, packetHeader, i + PacketHeaderBitLength);
}

function parsePacketHeader(bitArray: number[], i = 0): PacketHeader {
  const version = parseIntFromBits(bitArray.slice(i, i + VersionBitLength));
  const type = parseIntFromBits(
    bitArray.slice(i + VersionBitLength, i + PacketHeaderBitLength),
  );

  return {
    version,
    type,
  };
}

function parseLiteralPacket(
  bitArray: number[],
  packetHeader: PacketHeader,
  i = 0,
): Packet {
  let resultArray: number[] = [];
  let j = i;
  while (j + 3 < bitArray.length) {
    resultArray.push(...bitArray.slice(j + 1, j + LteralGroupBitLength));
    j += LteralGroupBitLength;
    if (bitArray[j - 5] === 0) {
      break;
    }
  }

  return {
    packetHeader,
    value: parseIntFromBits(resultArray),
    i: j,
    subpackets: [],
  };
}

function parseOperatorPacket(
  bitArray: number[],
  packetHeader: PacketHeader,
  i = 0,
): Packet {
  return bitArray[i] === 0
    ? parseOperatorPacketType0(bitArray, packetHeader, i + 1)
    : parseOperatorPacketType1(bitArray, packetHeader, i + 1);
}

function parseOperatorPacketType0(
  bitArray: number[],
  packetHeader: PacketHeader,
  i = 0,
): Packet {
  const subpackets: Packet[] = [];
  const subpacketLength = parseIntFromBits(
    bitArray.slice(i, i + OperatorPacketType0BitLength),
  );
  let j = i + OperatorPacketType0BitLength;
  while (j < i + OperatorPacketType0BitLength + subpacketLength) {
    const subpacket = parsePacket(bitArray, j);
    if (!subpacket) break;
    subpackets.push(subpacket);
    j = subpacket.i;
  }

  return {
    packetHeader,
    i: j,
    subpackets,
  };
}

function parseOperatorPacketType1(
  bitArray: number[],
  packetHeader: PacketHeader,
  i = 0,
): Packet {
  const subpackets: Packet[] = [];
  const subpacketLength = parseIntFromBits(
    bitArray.slice(i, i + OperatorPacketType1BitLength),
  );
  let j = i + OperatorPacketType1BitLength;
  while (subpackets.length < subpacketLength) {
    const subpacket = parsePacket(bitArray, j);
    if (!subpacket) break;
    subpackets.push(subpacket);
    j = subpacket.i;
  }

  return {
    packetHeader,
    i: j,
    subpackets,
  };
}

function parseIntFromBits(bitArray: number[]) {
  return parseInt(bitArray.join(''), 2);
}

function sumVersions(packet: Packet): number {
  return (
    packet.packetHeader.version +
    packet.subpackets.reduce((acc, cur) => acc + sumVersions(cur), 0)
  );
}

function part2(input: string[]) {
  const bitArray = createBitArray(input);
  const packet = parsePacket(bitArray)!;
  return evalPacket(packet);
}

function evalPacket(packet: Packet): number {
  switch (packet.packetHeader.type) {
    case PacketType.Sum:
      return packet.subpackets.reduce((acc, cur) => acc + evalPacket(cur), 0);
    case PacketType.Product:
      return packet.subpackets.reduce((acc, cur) => acc * evalPacket(cur), 1);
    case PacketType.Minimum:
      return packet.subpackets.reduce((acc, cur) => {
        const evaluatedPacket = evalPacket(cur);
        return evaluatedPacket < acc ? evaluatedPacket : acc;
      }, Infinity);
    case PacketType.Maximum:
      return packet.subpackets.reduce((acc, cur) => {
        const evaluatedPacket = evalPacket(cur);
        return evaluatedPacket > acc ? evaluatedPacket : acc;
      }, 0);
    case PacketType.Literal:
      return packet.value!;
    case PacketType.GreaterThan:
      return evalPacket(packet.subpackets[0]) > evalPacket(packet.subpackets[1])
        ? 1
        : 0;
    case PacketType.LessThan:
      return evalPacket(packet.subpackets[0]) < evalPacket(packet.subpackets[1])
        ? 1
        : 0;
    case PacketType.EqualTo:
      return evalPacket(packet.subpackets[0]) ===
        evalPacket(packet.subpackets[1])
        ? 1
        : 0;
    default:
      throw new Error(`Incorrect PacketType = ${packet.packetHeader.type}`);
  }
}

runPuzzles(part1, part2, 2021, 16, '');
