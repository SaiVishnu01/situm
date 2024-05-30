import { makeUseStyles } from 'src/core/styling';

export const useStyles = makeUseStyles(({}) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapview: {
    width: '100%',
    height: '100%',
  },
}));
