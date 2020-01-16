import React, { FunctionComponent, Fragment }  from 'react'
import { Text, Color } from 'ink'

type SectionProps = {
  title: string;
}

export const SectionTitle: FunctionComponent<SectionProps> = ({ title }) => (
  <Text><Color grey>{ '>' }</Color> <Color yellow>{ title }</Color></Text>
)


const Section: FunctionComponent<SectionProps> = ({ title, children }) => (
  <Fragment>
    <SectionTitle title={title} />
    { children }
  </Fragment>
)

export default Section
