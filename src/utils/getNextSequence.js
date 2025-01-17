// src/utils/getNextSequence.js
import Counter from '../models/Counter.js';

/**
 * 주어진 카운터 이름에 대한 다음 시퀀스 값을 반환합니다.
 * @param {string} name - 카운터의 이름 (예: 'incomes', 'expenses')
 * @returns {Promise<number>} - 다음 시퀀스 값
 */
async function getNextSequence(name) {
  const counter = await Counter.findByIdAndUpdate(
    name,
    { $inc: { sequence_value: 1 } }, // 시퀀스 값 1 증가
    { new: true, upsert: true } // 문서가 없으면 생성
  );
  return counter.sequence_value;
}

export default getNextSequence;
