import { connect } from 'react-redux'
import { Header } from './Header'

const mapStateToProps = state => {
  return state
};

export const HeaderContainer = connect(
  mapStateToProps
)(Header)
