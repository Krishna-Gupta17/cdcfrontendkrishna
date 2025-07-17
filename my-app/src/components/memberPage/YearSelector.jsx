import "../../styles/Members.css";
import { Link, useParams } from "react-router-dom";

const YearSelector = () => {
    const years = [2024, 2025];
    const { year: selectedYear } = useParams();

    // Default to 2024 if no year is selected
    const currentYear = selectedYear || "2025";

    return (
        <div className="year-selector-container">
            <div className="horizontal-line"></div>
            <span className="batch-label">Batch of</span>
            <div className="batch-tabs">
                <div className="batch-tab">
                    {years.map((year) => (
                        <Link
                            key={year}
                            to={`/teams/${year}`}
                            className={`year-link ${currentYear === String(year) ? 'active' : ''}`}
                            style={{
                                marginRight: "10px",
                                fontWeight: currentYear === String(year) ? "bold" : "normal",
                                textDecoration: "none",
                                padding: "8px 16px",
                                borderRadius: "4px",
                                backgroundColor: currentYear === String(year) ? "#007bff" : "transparent",
                                color: currentYear === String(year) ? "white" : "#007bff",
                            }}
                        >
                            {year}-{year + 4}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default YearSelector;