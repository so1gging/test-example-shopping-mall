import { renderHook, act } from '@testing-library/react';

import useConfirmModal from './useConfirmModal';

it('호출 시 initialValue 인자를 지정하지 않는 경우 isModalOpened 상태가 false로 설정된다.', () => {
  // result: hook을 호출하여 얻은 결과 값을 반환 -> result.current 값의 참조를 통해 최신 상태를 추적할 수 있다.
  // rerender: 훅을 원하는 인자와 함께 새로 호출하여 상태를 갱신한다.
  const { result } = renderHook(useConfirmModal);
  expect(result.current.isModalOpened).toBe(false);
});

it('호출 시 initialValue 인자를 boolean 값으로 지정하는 경우 해당 값으로 isModalOpened 상태가 설정된다.', () => {
  const { result } = renderHook(() => useConfirmModal(true));

  expect(result.current.isModalOpened).toBe(true);
});

it('훅의 toggleIsModalOpened()를 호출하면 isModalOpened 상태가 toggle된다.', () => {
  const { result, rerender } = renderHook(useConfirmModal);
  act(() => result.current.toggleIsModalOpened());
  expect(result.current.isModalOpened).toBe(true);
});

// 테스트환경에서 자동으로 jsdom의 렌더링과 이벤트 발생에 따른 상태 변경이 젹용되도록 하기 위해서는 Act함수를 반드시 호출해야 합니다.

// react testing library의 렌더함수와 유저이벤트는 내부적으로 act함수를 호출하여 동작한다.
