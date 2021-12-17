"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../../utils.js");
var PacketType;
(function (PacketType) {
    PacketType[PacketType["Sum"] = 0] = "Sum";
    PacketType[PacketType["Product"] = 1] = "Product";
    PacketType[PacketType["Minimum"] = 2] = "Minimum";
    PacketType[PacketType["Maximum"] = 3] = "Maximum";
    PacketType[PacketType["Literal"] = 4] = "Literal";
    PacketType[PacketType["GreaterThan"] = 5] = "GreaterThan";
    PacketType[PacketType["LessThan"] = 6] = "LessThan";
    PacketType[PacketType["EqualTo"] = 7] = "EqualTo";
})(PacketType || (PacketType = {}));
const VersionBitLength = 3;
const TypeBitLength = 3;
const PacketHeaderBitLength = VersionBitLength + TypeBitLength;
const LteralGroupBitLength = 5;
const OperatorPacketType0BitLength = 15;
const OperatorPacketType1BitLength = 11;
function part1(input) {
    const bitArray = createBitArray(input);
    const packet = parsePacket(bitArray);
    return sumVersions(packet);
}
function createBitArray(input) {
    return input
        .map(x => parseInt(x, 16))
        .map(x => x.toString(2).padStart(4, '0'))
        .flatMap(x => x.split(''))
        .map(x => parseInt(x));
}
function parsePacket(bitArray, i = 0) {
    if (i >= bitArray.length) {
        return;
    }
    const packetHeader = parsePacketHeader(bitArray, i);
    if (packetHeader.type === PacketType.Literal) {
        return parseLiteralPacket(bitArray, packetHeader, i + PacketHeaderBitLength);
    }
    return parseOperatorPacket(bitArray, packetHeader, i + PacketHeaderBitLength);
}
function parsePacketHeader(bitArray, i = 0) {
    const version = parseIntFromBits(bitArray.slice(i, i + VersionBitLength));
    const type = parseIntFromBits(bitArray.slice(i + VersionBitLength, i + PacketHeaderBitLength));
    return {
        version,
        type,
    };
}
function parseLiteralPacket(bitArray, packetHeader, i = 0) {
    let resultArray = [];
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
function parseOperatorPacket(bitArray, packetHeader, i = 0) {
    return bitArray[i] === 0
        ? parseOperatorPacketType0(bitArray, packetHeader, i + 1)
        : parseOperatorPacketType1(bitArray, packetHeader, i + 1);
}
function parseOperatorPacketType0(bitArray, packetHeader, i = 0) {
    const subpackets = [];
    const subpacketLength = parseIntFromBits(bitArray.slice(i, i + OperatorPacketType0BitLength));
    let j = i + OperatorPacketType0BitLength;
    while (j < i + OperatorPacketType0BitLength + subpacketLength) {
        const subpacket = parsePacket(bitArray, j);
        if (!subpacket)
            break;
        subpackets.push(subpacket);
        j = subpacket.i;
    }
    return {
        packetHeader,
        i: j,
        subpackets,
    };
}
function parseOperatorPacketType1(bitArray, packetHeader, i = 0) {
    const subpackets = [];
    const subpacketLength = parseIntFromBits(bitArray.slice(i, i + OperatorPacketType1BitLength));
    let j = i + OperatorPacketType1BitLength;
    while (subpackets.length < subpacketLength) {
        const subpacket = parsePacket(bitArray, j);
        if (!subpacket)
            break;
        subpackets.push(subpacket);
        j = subpacket.i;
    }
    return {
        packetHeader,
        i: j,
        subpackets,
    };
}
function parseIntFromBits(bitArray) {
    return parseInt(bitArray.join(''), 2);
}
function sumVersions(packet) {
    return (packet.packetHeader.version +
        packet.subpackets.reduce((acc, cur) => acc + sumVersions(cur), 0));
}
function part2(input) {
    const bitArray = createBitArray(input);
    const packet = parsePacket(bitArray);
    return evalPacket(packet);
}
function evalPacket(packet) {
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
            return packet.value;
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
(0, utils_js_1.runPuzzles)(part1, part2, 2021, 16, '');
//# sourceMappingURL=puzzle.js.map