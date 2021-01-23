import { useEffect, useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Link from 'next/link';
import { useLazyCurrentUser } from '../../apollo/actions';

import withApollo from '../../hoc/withApollo';

const AppLink = ({ href, cn, children, as }) => {
  return (
    <Link href={href} as={as}>
      <a className={cn}>{children}</a>
    </Link>
  );
};

const AppNavbar = () => {
  const [user, setUser] = useState(null);
  const [hasResponse, setHasResponse] = useState(false);

  const [getUser, { data, error }] = useLazyCurrentUser();

  useEffect(() => {
    getUser();
  }, []);

  if (data) {
    if (data.user && !user) {
      setUser(data.user);
    }
    if (!data.user && user) {
      setUser(null);
    }
    if (!hasResponse) {
      setHasResponse(true);
    }
  }

  return (
    <div className='navbar-wrapper'>
      <Navbar expand='lg' className='navbar-dark fj-mw9'>
        <AppLink href='/' cn='mr-3 font-weight-bold navbar-brand'>
          AndrewPersaud
        </AppLink>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className='navbar-nav mr-2'>
            <AppLink href='/portfolios' cn='nav-link mr-3'>
              Portfolios
            </AppLink>
            <AppLink href='/forum/categories' cn='nav-link mr-3'>
              Forum
            </AppLink>
            <AppLink href='/cv' cn='nav-link mr-3'>
              Cv
            </AppLink>
          </Nav>
          {hasResponse && (
            <Nav className='navbar-nav ml-auto'>
              {user && (
                <>
                  <span className='nav-link mr-2'>Welcome {user.username}</span>
                  {(user.role === 'admin' || user.role === 'instructor') && (
                    <NavDropdown
                      className='mr-2'
                      title='Manage'
                      id='basic-nav-dropdown'
                    >
                      <>
                        <AppLink
                          as={`/instructor/${user._id}/dashboard`}
                          href='/instructor/[id]/dashboard'
                          cn='dropdown-item'
                        >
                          Dashboard
                        </AppLink>
                        <AppLink href='/portfolios/new' cn='dropdown-item'>
                          Create Portfolio
                        </AppLink>
                      </>
                    </NavDropdown>
                  )}
                  <AppLink cn=' nav-link btn btn-danger' href='/logout'>
                    Logout
                  </AppLink>
                </>
              )}
              {(!user || error) && (
                <>
                  <AppLink cn=' nav-link mr-3' href='/login'>
                    Sign In
                  </AppLink>
                  <AppLink
                    cn='btn btn-success bg-green-2 bright'
                    href='/register'
                  >
                    Sign Up
                  </AppLink>
                </>
              )}
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withApollo(AppNavbar);
