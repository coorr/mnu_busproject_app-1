// 데이터 비동기 처리
export function fetchCount(amount = 1) {
  return new Promise(resolve =>
    setTimeout(() => resolve({ data: amount }), 500),
  );
}
