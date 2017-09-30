import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { SearchPage } from './SearchPage'
import { changeSearchRadius } from '../../actions'

const mapStateToProps = state => {
  const { navigator: { lat, lng }, search, auth} = state || {};
  return {
    lat,
    lng,
    radius: search.radius,
    user: auth.user
  }
}

const mapDispatchToProps = dispatch => ({
  changeSearchRadius: bindActionCreators(changeSearchRadius, dispatch)
});

export const SearchPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
