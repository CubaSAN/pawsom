import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { SearchPage } from './SearchPage'
import { changeCoords } from '../../actions'

const mapStateToProps = state => {
  const { navigator: { lat, lon }} = state || {};
  return {
    lat,
    lon
  }
}

const mapDispatchToProps = dispatch => ({
  changeCoords: bindActionCreators(changeCoords, dispatch)
});

export const SearchPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
