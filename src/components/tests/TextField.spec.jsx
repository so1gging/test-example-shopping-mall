import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

// 모든 테스트가 실행 전
// beforeEach(async () => {
//   await render(<TextField className="my-class" />);
// });

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

  screen.debug(); // DOM구조를 확인할 수 있음.

  // className이란 내부 prop이나 state를 검증하지 않고
  // 렌더링 되는 DOM구조가 올바르게 변경되었는지 확인(O) -> 최종적으로 사용자가 보는 결과는 DOM
  expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
    'my-class',
  );
});

// 그룹핑 가능
it('기본 placeholder "텍스트를 입력해 주세요." 가 노출된다.', async function () {
  // 기대결과 정의
  // 기대결과 === 실제결과 -> 성공
  // 기대결과 !== 실제결과 -> 실패

  await render(<TextField />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  // matcher : 기대결과 검증을 위한 api
  expect(textInput).toBeInTheDocument();
  // 단언 : assertion
  // 테스트 성공 조건을 서술하기 위해 사용
});

it('placeholder prop에 따라 placeholder가 변경된다.', async function () {
  // 기대결과 정의
  // 기대결과 === 실제결과 -> 성공
  // 기대결과 !== 실제결과 -> 실패

  await render(<TextField placeholder="상품명을 입력해 주세요." />);
  const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

  expect(textInput).toBeInTheDocument(); // dom에 존재하는지
});

/**
 * it -> test 함수의 aliasing
 * it('should~~~')
 * test('if~~~~')
 * 기능상의 차이는 없다.
 */

describe('placeholder', () => {
  beforeEach(() => {
    console.log('describe - before Each');
  });
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

  // 그룹핑 가능
  it('기본 placeholder "텍스트를 입력해 주세요." 가 노출된다.', async function () {
    // 기대결과 정의
    // 기대결과 === 실제결과 -> 성공
    // 기대결과 !== 실제결과 -> 실패

    await render(<TextField />);
    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    // matcher : 기대결과 검증을 위한 api
    expect(textInput).toBeInTheDocument();
    // 단언 : assertion
    // 테스트 성공 조건을 서술하기 위해 사용
  });

  it('placeholder prop에 따라 placeholder가 변경된다.', async function () {
    // 기대결과 정의
    // 기대결과 === 실제결과 -> 성공
    // 기대결과 !== 실제결과 -> 실패

    await render(<TextField placeholder="상품명을 입력해 주세요." />);
    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    expect(textInput).toBeInTheDocument(); // dom에 존재하는지
  });
});

it('텍스트를 입력할 때 마다 onChange 가 호출된다.', async function () {
  // userEvent
  // 다양한 이벤트를 실제 브라우저와 유사하게 구현

  const spy = vi.fn(); // 스파이함수

  const { user } = await render(<TextField onChange={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.'); // placeholder기준으로 찾을 수 있음.

  await user.type(textInput, 'test'); //typing을 사용할 수 있다. keydown이벤트를 실행시킴.

  expect(spy).toHaveBeenCalledWith('test');
  // 우선순위
  // 실제 사용자의 상호작용 방식과 가장 유사한 쿼리가 더 우선순위가 높다.
  // role, lable, placeholder, text 권장
  // testId: DOM구조가 바뀌면 텍스트 자체도 깨질 수 있기 때문에 다른 쿼리를 쓰자.
});

it('Enter키를 입력하면, onEnter가 실행됨.', async function () {
  // userEvent
  // 다양한 이벤트를 실제 브라우저와 유사하게 구현

  const spy = vi.fn(); // 스파이함수

  const { user } = await render(<TextField onEnter={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.'); // placeholder기준으로 찾을 수 있음.

  await user.type(textInput, 'test{Enter}'); //typing을 사용할 수 있다. keydown이벤트를 실행시킴.

  expect(spy).toHaveBeenCalledWith('test');
  // 우선순위
  // 실제 사용자의 상호작용 방식과 가장 유사한 쿼리가 더 우선순위가 높다.
  // role, lable, placeholder, text 권장
  // testId: DOM구조가 바뀌면 텍스트 자체도 깨질 수 있기 때문에 다른 쿼리를 쓰자.
});

it('focus시 onFocus 호출되는지', async function () {
  // userEvent
  // 다양한 이벤트를 실제 브라우저와 유사하게 구현

  const spy = vi.fn(); // 스파이함수

  const { user } = await render(<TextField onFocus={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.'); // placeholder기준으로 찾을 수 있음.

  await user.click(textInput);

  expect(spy).toHaveBeenCalled();

  // 우선순위
  // 실제 사용자의 상호작용 방식과 가장 유사한 쿼리가 더 우선순위가 높다.
  // role, lable, placeholder, text 권장
  // testId: DOM구조가 바뀌면 텍스트 자체도 깨질 수 있기 때문에 다른 쿼리를 쓰자.
});

it('focus시 border 스타일 변경', async function () {
  // userEvent
  // 다양한 이벤트를 실제 브라우저와 유사하게 구현

  const spy = vi.fn(); // 스파이함수

  const { user } = await render(<TextField onFocus={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.'); // placeholder기준으로 찾을 수 있음.

  await user.click(textInput);

  expect(textInput).toHaveStyle(
    "borderWidth: 2, borderColor: 'rgb(25, 118, 210)'",
  );

  // 우선순위
  // 실제 사용자의 상호작용 방식과 가장 유사한 쿼리가 더 우선순위가 높다.
  // role, lable, placeholder, text 권장
  // testId: DOM구조가 바뀌면 텍스트 자체도 깨질 수 있기 때문에 다른 쿼리를 쓰자.
});
