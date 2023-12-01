import { BrowserRouter, Route, Routes as DomRoutes } from 'react-router-dom'

import * as Pages from 'src/presentation/pages'
import { MainOutlet } from './main-outlet'

export const Router: React.FC = () => {

  return (
    <BrowserRouter>
      <DomRoutes>
        <Route Component={MainOutlet}>
          <Route index path="/" Component={Pages.Home} />
        </Route>
      </DomRoutes>
    </BrowserRouter>
  )
}
