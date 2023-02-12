import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Badge, Button, Col, Nav, NavDropdown, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
import SinginScreen from './screens/SigninScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SingupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import { getError } from './utils';
import axios from 'axios';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardScreen from './screens/DashboardScreen';
import AdminRoute from './components/AdminRoute';
import furnonLogo from './assets/logos/furnonLogo.png';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'd-flex flex-column site-container active-cont'
            : 'd-flex flex-column site-container'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <Navbar className="NavbarFooter" variant="dark" expand="lg">
            <Container>
              <Button
                className="btnToggler d-lg-none"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
              <LinkContainer to="/">
                <Navbar.Brand>
                  <img
                    width="150px"
                    height="auto"
                    className="img-responsive"
                    src={furnonLogo}
                    alt="logo"
                  />
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle
                className="NavbarFooterTogglerBtn"
                aria-controls="basic-NavbarFooter-nav"
              >
                <Button className="btnToggler d-lg-none">
                  <i class="fas fa-caret-down"></i>
                </Button>
              </Navbar.Toggle>
              <Navbar.Collapse
                className="d-lg-flex justify-content-center"
                id="basic-NavbarFooter-nav"
              >
                <div className="w-100 d-flex justify-content-end">
                  <SearchBox />
                </div>
                <Nav className="width50 width100 d-flex justify-content-end">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                  {userInfo ? (
                    <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <NavDropdown title="Admin" id="admin-nav-dropdown">
                      <LinkContainer to="/admin/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Nav className="NavbarFooterLinks d-none d-lg-flex justify-content-center w-100 p-2">
            <Nav.Item>
              <LinkContainer to="/" onClick={() => setSidebarIsOpen(false)}>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
            <Nav.Item>
              <LinkContainer to="/" onClick={() => setSidebarIsOpen(false)}>
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/" onClick={() => setSidebarIsOpen(false)}>
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
          {/* <Link to="/">FURNON</Link> */}
        </header>
        <div
          className={
            sidebarIsOpen
              ? 'active-nav side-NavbarFooter d-flex justify-content-between flex-wrap flex-column'
              : 'side-NavbarFooter d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <LinkContainer to="/" onClick={() => setSidebarIsOpen(false)}>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={{ pathname: '/search', search: `category=${category}` }}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
            <Nav.Item>
              <LinkContainer to="/" onClick={() => setSidebarIsOpen(false)}>
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/" onClick={() => setSidebarIsOpen(false)}>
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </div>
        <main>
          <Container fluid className="p-0">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/search" element={<SearchScreen />} />
              <Route path="/signin" element={<SinginScreen />} />
              <Route path="/signup" element={<SingupScreen />} />
              <Route path="/shipping" element={<ShippingAddressScreen />} />
              <Route path="/payment" element={<PaymentMethodScreen />} />
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <AdminRoute>
                    <DashboardScreen />
                  </AdminRoute>
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileScreen />
                  </ProtectedRoute>
                }
              />
              <Route path="/placeorder" element={<PlaceOrderScreen />} />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orderhistory"
                element={
                  <ProtectedRoute>
                    <OrderHistoryScreen />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrderListScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <AdminRoute>
                    <ProductListScreen />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/product/:id"
                element={
                  <AdminRoute>
                    <ProductEditScreen />
                  </AdminRoute>
                }
              />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer className="page-footer font-small blue pt-4 NavbarFooter">
          <Container>
            <Row>
              <Col className="col-md-6 mt-md-0 mt-3">
                <img
                  width="150px"
                  height="auto"
                  className="img-responsive mb-2"
                  src={furnonLogo}
                  alt="logo"
                />
                <p>
                  Torem ipsum dolor sit amet, consectetur adipisicing elitsed do
                  eiusmo tempor incididunt ut labore et dolore magna elitsed do
                  eiusmo tempor incididunt ut labore et dolore magna.
                </p>
              </Col>

              <hr className="clearfix w-100 d-md-none pb-0" />

              <Col>
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/" className="nav-link">Link</Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link">Link</Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link">Link</Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link">Link</Link>
                  </li>
                </ul>
              </Col>

              <Col>
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/" className="nav-link">Link</Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link">Link</Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link">Link</Link>
                  </li>
                  <li>
                    <Link to="/" className="nav-link">Link</Link>
                  </li>
                </ul>
              </Col>
            </Row>
            <Row>
              <div className="footer-copyright text-center py-3">
                © 2023 Copyright:
              </div>
            </Row>
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
