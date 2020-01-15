import React, { FunctionComponent, Fragment }  from 'react'
import { Text, Color } from 'ink'

type SectionProps = {
  title: string;
}

const Section: FunctionComponent<SectionProps> = ({ title, children }) => (
  <Fragment>
    <Text><Color grey>{ '>' }</Color> <Color yellow>{ title }</Color></Text>
    { children }
  </Fragment>
)

/* Section.propTypes = { */
/*   title: PropTypes.string */
/* } */

export default Section
