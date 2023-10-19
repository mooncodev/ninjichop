  function removeLiquidity(
    address tokenA, address tokenB, uint liquidity, uint amountAMin, uint amountBMin, address to, uint deadline
  ) public virtual override ensure(deadline)
  returns (uint amountA, uint amountB) {
    address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
    IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
    (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
    (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
    (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
    require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
    require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
  }

function removeLiquidityETH(
  address token, uint liquidity, uint amountTokenMin, uint amountETHMin, address to, uint deadline
) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {

  (amountToken, amountETH) = removeLiquidity(
    token,
    WETH,
    liquidity,
    amountTokenMin,
    amountETHMin,
    address(this),
    deadline
  );
  console.log('in removeLiquidityETH()after removeLiquidity');
  TransferHelper.safeTransfer(token, to, amountToken);//fx.transfer(router,to,amt)
  console.log('in removeLiquidityETH()after safeTransfer');
  IWETH(WETH).withdraw(amountETH);
  console.log('in removeLiquidityETH()after IWETH(WETH).withdraw');
  TransferHelper.safeTransferETH(to, amountETH);
  console.log('in removeLiquidityETH()after safeTransferETH');
}


    function safeTransfer(address token, address to, uint value) internal {
      console.log('in TransferHelper.safeTransfer()');
      // bytes4(keccak256(bytes('transfer(address,uint256)')));
      (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
      require(success && (data.length == 0 || abi.decode(data, (bool))), 'TransferHelper: TRANSFER_FAILED');
      console.log('out TransferHelper.safeTransfer()');
    }

    function safeTransferFrom(address token, address from, address to, uint value) internal {
      console.log('in TransferHelper.safeTransferFrom()');
      console.log('safeTransferFrom() token: ',token);
      console.log('safeTransferFrom()from, to, value: ',from, to, value);
      // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
      (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
      console.log('in .safeTransferFrom() success:', success);
      //        console.log('in .safeTransferFrom() data:', data);
      require(success && (data.length == 0 || abi.decode(data, (bool))), 'TransferHelper: TRANSFER_FROM_FAILED');
    }

    function safeTransferETH(address to, uint value) internal {
      console.log('in TransferHelper.safeTransferETH() to ',to);
      console.log('in TransferHelper.safeTransferETH() val ',value);
      (bool success,) = to.call{value:value}(new bytes(0));
      console.log('in TransferHelper.safeTransferETH() success ',success);
      require(success, 'TransferHelper: ETH_TRANSFER_FAILED');
    }
