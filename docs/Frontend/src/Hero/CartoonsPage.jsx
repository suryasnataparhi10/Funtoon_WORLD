import React from "react";
import { Container, Row, Col, Card, Badge, Navbar, Nav, Form, InputGroup, Breadcrumb, Button } from "react-bootstrap";
import { PlayFill, Heart, Star, Clock, Person, Search, ArrowLeft, Filter, Grid } from "react-bootstrap-icons";
import { indianCartoons, fallbackImages } from "../Home/data";
import "./Hero.css";

const CartoonsPage = () => {
  // Enhanced cartoons data with additional properties
  const cartoons = indianCartoons.map((cartoon, index) => ({
    id: index + 1,
    title: cartoon.title,
    description: cartoon.description,
    imageUrl: cartoon.img,
    fallbackImage: fallbackImages[cartoon.title],
    rating: (4.3 + Math.random() * 0.6).toFixed(1),
    episodes: Math.floor(Math.random() * 100) + 50,
    category: getCategory(cartoon.title),
    isFavorite: Math.random() > 0.5,
    duration: `${Math.floor(Math.random() * 10) + 15}m`,
    characters: getCharacters(cartoon.title),
    color: cartoon.color,
    emoji: cartoon.character,
    year: getYear(cartoon.title),
    status: Math.random() > 0.3 ? "Ongoing" : "Completed"
  }));

  // Helper function to determine category based on title
  function getCategory(title) {
    const categories = {
      "Chhota Bheem": "Adventure",
      "Motu Patlu": "Comedy", 
      "Shin Chan": "Comedy",
      "Krishna Balram": "Mythology",
      "Roll No. 21": "Adventure",
      "Little Singham": "Action",
      "Mighty Raju": "Adventure",
      "Gattu Battu": "Mystery",
      "Tenali Rama": "Educational",
      "Pakdam Pakdai": "Comedy",
      "Kumbh Karan": "Comedy",
      "Baal Veer": "Fantasy",
      "Arjun - Prince of Bali": "Mythology",
      "Vikram Betal": "Mythology"
    };
    return categories[title] || "Adventure";
  }

  // Helper function to get characters based on title
  function getCharacters(title) {
    const characterMap = {
      "Chhota Bheem": ["Bheem", "Chutki", "Raju", "Jaggu", "Kalia"],
      "Motu Patlu": ["Motu", "Patlu", "John", "Ghasitaram", "Dr. Jhatka"],
      "Shin Chan": ["Shin Chan", "Himawari", "Misae", "Hiroshi", "Kazama"],
      "Krishna Balram": ["Krishna", "Balram", "Radha", "Kansa", "Yashoda"],
      "Roll No. 21": ["Krishna", "Kansa", "Sudama", "Balram", "Principal"],
      "Little Singham": ["Singham", "Babloo", "Champu", "Bhide", "Dayya"],
      "Mighty Raju": ["Raju", "Rani", "Bittu", "Babloo", "Principal"],
      "Gattu Battu": ["Gattu", "Battu", "Professor", "Kittu", "Chhotu"],
      "Tenali Rama": ["Tenali Rama", "King Krishnadevaraya", "Tathacharya", "Queen"],
      "Pakdam Pakdai": ["Doggy Don", "Kittu", "Chhotu", "Motu", "Shero"],
      "Kumbh Karan": ["Kumbh Karan", "Raju", "Laddoo", "Moti", "Chotu"],
      "Baal Veer": ["Baal Veer", "Baal Mitra", "Rani Pari", "Bhim Pari"],
      "Arjun - Prince of Bali": ["Arjun", "Suraj", "Maya", "Balaram", "Krishna"],
      "Vikram Betal": ["Vikram", "Betal", "King", "Queen", "Minister"]
    };
    return characterMap[title] || ["Main Character"];
  }

  // Helper function to get release year
  function getYear(title) {
    const years = {
      "Chhota Bheem": 2008,
      "Motu Patlu": 2012,
      "Shin Chan": 2006,
      "Krishna Balram": 2007,
      "Roll No. 21": 2010,
      "Little Singham": 2018,
      "Mighty Raju": 2011,
      "Gattu Battu": 2015,
      "Tenali Rama": 2017,
      "Pakdam Pakdai": 2013,
      "Kumbh Karan": 2016,
      "Baal Veer": 2012,
      "Arjun - Prince of Bali": 2021,
      "Vikram Betal": 2019
    };
    return years[title] || 2010;
  }

  const categories = ["All", "Adventure", "Comedy", "Mythology", "Action", "Fantasy", "Educational", "Mystery"];
  const years = ["All", "2000s", "2010s", "2020s"];
  const statuses = ["All", "Ongoing", "Completed"];
  
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedYear, setSelectedYear] = React.useState("All");
  const [selectedStatus, setSelectedStatus] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState("rating");
  const [viewMode, setViewMode] = React.useState("grid");
  const [showFilters, setShowFilters] = React.useState(false);

  const filteredCartoons = cartoons
    .filter(cartoon => 
      selectedCategory === "All" || cartoon.category === selectedCategory
    )
    .filter(cartoon => {
      if (selectedYear === "All") return true;
      if (selectedYear === "2000s") return cartoon.year >= 2000 && cartoon.year < 2010;
      if (selectedYear === "2010s") return cartoon.year >= 2010 && cartoon.year < 2020;
      if (selectedYear === "2020s") return cartoon.year >= 2020;
      return true;
    })
    .filter(cartoon =>
      selectedStatus === "All" || cartoon.status === selectedStatus
    )
    .filter(cartoon =>
      cartoon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cartoon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cartoon.characters.some(char => char.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "episodes":
          return b.episodes - a.episodes;
        case "title":
          return a.title.localeCompare(b.title);
        case "year":
          return b.year - a.year;
        default:
          return 0;
      }
    });

  const handlePlay = (cartoonTitle) => {
    alert(`🎬 Playing ${cartoonTitle}`);
  };

  const toggleFavorite = (cartoonId) => {
    console.log(`Toggled favorite for cartoon ${cartoonId}`);
  };

  const handleImageError = (e, cartoon) => {
    if (cartoon.fallbackImage) {
      e.target.src = cartoon.fallbackImage;
    }
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedYear("All");
    setSelectedStatus("All");
    setSearchQuery("");
  };

  return (
    <div className="cartoons-page-wrapper">

      <Container fluid className="py-4 px-5 cartoons-page">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Indian Cartoons</Breadcrumb.Item>
        </Breadcrumb>

        {/* Header Section */}
        <Row className="mb-4">
          <Col>
            <div className="page-header">
              <h1 className="page-title mb-2">
                <span className="title-emoji">📺</span> Indian Cartoon Universe
              </h1>
              <p className="page-subtitle text-muted">
                Explore {cartoons.length}+ animated shows from India. Relive your childhood memories!
              </p>
            </div>
          </Col>
        </Row>

        {/* Controls Section */}
        <Row className="mb-4">
          <Col lg={6} md={8}>
            <div className="controls-section">
              {/* Category Filters */}
              <div className="category-filters mb-3">
                {categories.map(category => (
                  <Badge
                    key={category}
                    bg={selectedCategory === category ? "primary" : "outline-primary"}
                    className="category-badge me-2 mb-2 text-dark"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>

              {/* Advanced Filters Toggle */}
              <Button 
                variant="outline-secondary" 
                size="sm"
                className="me-2 mb-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={14} className="me-1" />
                {showFilters ? "Hide Filters" : "More Filters"}
              </Button>

              {/* View Mode Toggle */}
              <Button 
                variant="outline-secondary" 
                size="sm"
                className="mb-2"
                onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              >
                <Grid size={14} className="me-1" />
                {viewMode === "grid" ? "List View" : "Grid View"}
              </Button>

              {/* Clear Filters */}
              {(selectedCategory !== "All" || selectedYear !== "All" || selectedStatus !== "All" || searchQuery) && (
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  className="mb-2 ms-2"
                  onClick={clearFilters}
                >
                  Clear All
                </Button>
              )}
            </div>
          </Col>
          <Col lg={3} md={4} className="text-dark">
            {/* Sort Dropdown */}
            <Form.Select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-dropdown mb-3"
            >
              <option value="rating">Sort by Rating</option>
              <option value="episodes">Sort by Episodes</option>
              <option value="title">Sort by Title</option>
              <option value="year">Sort by Year</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Advanced Filters */}
        {showFilters && (
          <Row className="mb-4 advanced-filters">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Release Decade</Form.Label>
                <div className="filter-options">
                  {years.map(year => (
                    <Badge
                      key={year}
                      bg={selectedYear === year ? "secondary" : "outline-secondary"}
                      className="filter-badge me-2 mb-2"
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </Badge>
                  ))}
                </div>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <div className="filter-options">
                  {statuses.map(status => (
                    <Badge
                      key={status}
                      bg={selectedStatus === status ? "info" : "outline-info"}
                      className="filter-badge me-2 mb-2"
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </Badge>
                  ))}
                </div>
              </Form.Group>
            </Col>
          </Row>
        )}

        {/* Results Info */}
        <Row className="mb-3">
          <Col>
            <div className="results-info">
              <span className="text-muted">
                Showing {filteredCartoons.length} of {cartoons.length} cartoons
                {searchQuery && ` for "${searchQuery}"`}
                {selectedCategory !== "All" && ` in ${selectedCategory}`}
                {selectedYear !== "All" && ` from ${selectedYear}`}
                {selectedStatus !== "All" && ` (${selectedStatus})`}
              </span>
            </div>
          </Col>
        </Row>

        {/* Cartoons Grid */}
        <Row className={viewMode === "grid" ? "cartoons-grid" : "cartoons-list"}>
          {filteredCartoons.map((cartoon) => (
            <Col 
              key={cartoon.id} 
              xl={viewMode === "grid" ? 3 : 12} 
              lg={viewMode === "grid" ? 4 : 12} 
              md={viewMode === "grid" ? 6 : 12} 
              className="mb-4"
            >
              <Card className={`cartoon-card h-100 ${viewMode}`}>
                <div className="card-content-wrapper">
                  {/* Image with Overlay */}
                  <div className="card-image-container">
                    <Card.Img 
                      variant="top" 
                      src={cartoon.imageUrl}
                      alt={cartoon.title}
                      className="cartoon-image"
                      onError={(e) => handleImageError(e, cartoon)}
                      style={{ background: cartoon.color }}
                    />
                    <div className="card-overlay">
                      <div className="action-buttons">
                        <button 
                          className="btn btn-play"
                          onClick={() => handlePlay(cartoon.title)}
                        >
                          <PlayFill size={20} />
                        </button>
                        <button 
                          className={`btn btn-favorite ${cartoon.isFavorite ? 'favorited' : ''}`}
                          onClick={() => toggleFavorite(cartoon.id)}
                        >
                          <Heart size={18} fill={cartoon.isFavorite ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>
                    <Badge bg="warning" className="rating-badge">
                      <Star size={12} className="me-1" />
                      {cartoon.rating}
                    </Badge>
                    <div className="emoji-badge">
                      {cartoon.emoji}
                    </div>
                    {viewMode === "list" && (
                      <Badge bg="dark" className="year-badge">
                        {cartoon.year}
                      </Badge>
                    )}
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                      <Badge bg="outline-primary" className="category-tag me-2 text-dark">
                        {cartoon.category}
                      </Badge>
                      <Badge bg="outline-success" className="status-tag text-dark">
                        {cartoon.status}
                      </Badge>
                    </div>
                    
                    <Card.Title className="cartoon-card-title">
                      {cartoon.title}
                    </Card.Title>
                    
                    <Card.Text className="cartoon-description flex-grow-1">
                      {cartoon.description}
                    </Card.Text>

                    {/* Meta Information */}
                    <div className="cartoon-meta">
                      <div className="meta-item">
                        <Clock size={14} className="me-1" />
                        <small>{cartoon.duration}</small>
                      </div>
                      <div className="meta-item">
                        <Person size={14} className="me-1" />
                        <small>{cartoon.episodes} eps</small>
                      </div>
                      <div className="meta-item">
                        <small>Since {cartoon.year}</small>
                      </div>
                    </div>

                    {/* Characters */}
                    <div className="characters-section">
                      <small className="text-muted">Main Characters:</small>
                      <div className="characters-list">
                        {cartoon.characters.slice(0, 3).map((character, index) => (
                          <Badge key={index} bg="outline-secondary" className="cartoon-character-badge">
                            {character}
                          </Badge>
                        ))}
                        {cartoon.characters.length > 3 && (
                          <Badge bg="outline-secondary" className="cartoon-character-badge">
                            +{cartoon.characters.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card.Body>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Empty State */}
        {filteredCartoons.length === 0 && (
          <Row>
            <Col className="text-center py-5">
              <div className="empty-state">
                <div className="empty-state-emoji">😕</div>
                <h4>No cartoons found</h4>
                <p className="text-muted">
                  {searchQuery 
                    ? `No results for "${searchQuery}"`
                    : "Try adjusting your filters or search terms"
                  }
                </p>
                {(searchQuery || selectedCategory !== "All" || selectedYear !== "All" || selectedStatus !== "All") && (
                  <button 
                    className="btn btn-primary mt-3"
                    onClick={clearFilters}
                  >
                    Show All Cartoons
                  </button>
                )}
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default CartoonsPage;