from sqlalchemy import text

from root.database import engine
from root.session import session


def search_category(text_to_category: str):
    query = text(
        f"""
        SELECT category_cache.category_text
        FROM category_cache
        WHERE source_text=:text
        AND category_text IS NOT NULL;
        """
    )

    result = engine.execute(query, {"text": text_to_category})
    column_names = result.keys()
    data = [dict(zip(column_names, row)) for row in result.fetchall()]
    return data


def last_access_register_category_cache(text_to_category: str):
    query = text(
        f"""
        UPDATE category_cache
        SET last_access_date=CURRENT_DATE
        WHERE source_text=:text
        """
    )

    session.execute(query, {"text": text_to_category})
    session.commit()

    session.close()


def cache_category_text(text_to_category: str, result: str):
    sql = text(
        """
        INSERT INTO category_cache
        (source_text,
        category_text)
        VALUES
        (:text_to_category,
        :result);
        """
    )

    session.execute(sql, {"text_to_category": text_to_category, "result": result})
    session.commit()

    session.close()
