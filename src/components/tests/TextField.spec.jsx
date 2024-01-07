import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

// 1. description 을 잘 작성해야 한다.
it('className prop 으로 설정한 css class가 적용된다.', async () => {
  // AAA 패턴

  // Arrange - 테스트를 위한 환경 만들기
  // -> className을 지닌 컴포넌트 렌더링
  // Act - 테스트할 동작 발생
  // -> 렌더링에 대한 검증이기 때문에 생략
  // -> 클릭이나 메서드 호출, props 변경 등등에 대한 작업이 해당.
  // Assert - 올바른 동작이 실행되었는지 검증
  // -> 렌더링 후 DOM에 해당 class가 존재하는지 검증!

  // testing-library : render

  // render함수를 호출하면 -> 테스트 환경의 jsDOM에 리엑트 컴포넌트가 렌더링된 DOM구조가 반영
  // jsDOM: 웹 표준을 순수 자바스크립트로 구현
  // Arrange 단계 끝! - > await render(<TextField className="my-class"/>)

  // query : 사용자가 탐색할 수 있음.
  await render(<TextField className="my-class" />);

  // className이란 내부 prop이나 state를 검증하지 않고
  // 렌더링 되는 DOM구조가 올바르게 변경되었는지 확인(O) -> 최종적으로 사용자가 보는 결과는 DOM
  expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
    'my-class',
  );
});
