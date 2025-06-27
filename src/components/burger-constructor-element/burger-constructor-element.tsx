import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { moveIngredient, removeIngredient } from '@slices';
import { useDispatch } from '@store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveIngredient({ up: index, down: index + 1 }));
    };

    const handleMoveUp = () => {
      dispatch(moveIngredient({ up: index, down: index - 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
