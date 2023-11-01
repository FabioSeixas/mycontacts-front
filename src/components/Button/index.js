import PropTypes from 'prop-types';
import Spinner from '../Spinner';
import { StyledButton } from './styles';

export default function Button({
  type,
  disabled,
  isLoading,
  children,
  danger,
  onClick,
}) {
  return (
    <StyledButton
      data-cy={"generic-button"}
      danger={danger}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Spinner /> : children}
    </StyledButton>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
  danger: false,
  onClick: undefined,
};
