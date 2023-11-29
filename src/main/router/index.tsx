import { BrowserRouter, Route, Routes as DomRoutes } from 'react-router-dom'

import * as Pages from 'src/presentation/pages'

export const Router: React.FC = () => {

  return (
    <BrowserRouter>
      <DomRoutes>
        <Route index path="/" Component={Pages.Home} />
      </DomRoutes>
    </BrowserRouter>
  )
}
